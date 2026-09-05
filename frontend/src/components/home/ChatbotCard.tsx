import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";

import { useAppMutation } from "../../hooks/apiHooks";
import { createChatSession } from "../../apis/chat/chat";

import chatSearchIcon from "../../assets/icons/home/chat-search.svg";
import boyIcon from "../../assets/icons/test/boy.png";
import chevronIcon from "../../assets/icons/common/chevron.svg";

interface ChatbotCardProps {
  hasHistory: boolean;
  title: string;
  description: string | null;
  recommendedQuestions: string[];
  buttonText: string;
  child: { child_id: number; name: string } | null;
  latestTest: {
    test_id: number;
    days_ago: number;
    days_ago_label: string;
    test_order: number;
    test_order_label: string;
  } | null;
  // child/latestTest가 없을 때(완료된 검사가 없는 상태)도 일반 상담방을
  // 만들 수 있도록, 홈에서 이미 불러온 자녀 ID를 대체로 받는다.
  fallbackChildId?: number | null;
}

const ChatbotCard: React.FC<ChatbotCardProps> = ({
  hasHistory,
  title,
  description,
  recommendedQuestions,
  buttonText,
  child,
  latestTest,
  fallbackChildId,
}) => {
  const navigate = useNavigate();

  const { mutate: startChatWithQuestion, isPending } = useAppMutation<
    any,
    {
      child_id: number;
      htp_test_id: number | null;
      title: string;
      question: string;
    }
  >(
    (body) =>
      createChatSession({
        child_id: body.child_id,
        htp_test_id: body.htp_test_id as unknown as number,
        title: body.title,
      }),
    {
      onSuccess: (response, variables) => {
        let parsedResponse = response;
        if (typeof response === "string") {
          try {
            parsedResponse = JSON.parse(response);
          } catch (e) {
            parsedResponse = response;
          }
        }

        const createdRoomId =
          parsedResponse && typeof parsedResponse === "object"
            ? parsedResponse.session_id || parsedResponse.id
            : parsedResponse;

        if (createdRoomId) {
          const isReportChat = !!variables.htp_test_id;
          navigate(`/chat/report/${createdRoomId}`, {
            state: {
              hasReport: isReportChat,
              reportId: variables.htp_test_id || undefined,
              initialQuestion: variables.question,
            },
          });
        } else {
          alert("채팅방 정보가 올바르지 않습니다.");
        }
      },
      onError: (error) => {
        console.error("추천 질문으로 채팅방 생성 실패:", error);
        alert("채팅 시작 중 오류가 발생했습니다.");
      },
    },
  );

  const handleChatNavigate = () => {
    navigate("/chat/intro-step");
  };

  const handleQuestionClick = (question: string) => {
    if (isPending) return;

    if (child && latestTest) {
      startChatWithQuestion({
        child_id: child.child_id,
        htp_test_id: latestTest.test_id,
        title: `${child.name} 리포트 상담`,
        question,
      });
      return;
    }

    // 완료된 검사가 아직 없는 상태 — 리포트 없이 이 질문으로 바로 새
    // 상담방을 시작한다. 자녀 정보 자체가 전혀 없을 때만 선택 화면으로 보낸다.
    const generalChildId = child?.child_id ?? fallbackChildId;
    if (!generalChildId) {
      navigate("/chat/intro-step");
      return;
    }

    startChatWithQuestion({
      child_id: generalChildId,
      htp_test_id: null,
      title: "일반 육아 상담",
      question,
    });
  };

  return (
    <div className="flex w-[370px] p-side flex-col justify-center items-start rounded-md bg-white mb-side">
      <div className="flex items-center gap-[10px] mb-side w-full">
        <img
          src={chatSearchIcon}
          alt="챗봇"
          className="w-icon-lg h-icon-lg object-contain"
        />
        <div className="flex flex-col">
          <span
            className="text-sub-500 text-e-footnote"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            AI 챗봇 상담사
          </span>
          <h3
            className="text-black text-e-body-1 font-bold mt-[2px]"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            {title}
          </h3>
        </div>
      </div>

      {hasHistory && child && latestTest ? (
        <div className="flex w-[338px] p-[8px_12px] justify-between items-center rounded-sm bg-sub-100 mb-side">
          <div className="flex items-center gap-[8px]">
            <div className="flex w-[40px] h-[40px] justify-center items-center rounded-full bg-white overflow-hidden">
              <img
                src={boyIcon}
                alt="아이 정보"
                className="w-[22px] h-[22px] object-cover"
              />
            </div>
            <span className="text-black text-e-subheadline">{child.name}</span>
          </div>
          <div className="flex items-center text-black text-footnote">
            <span>{latestTest.days_ago_label}</span>
            <span className="mx-[2px]">・</span>
            <span>{latestTest.test_order_label}</span>
          </div>
        </div>
      ) : (
        <p
          className="text-grey-700 text-subheadline mb-side whitespace-pre-line"
          style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
        >
          {description}
        </p>
      )}

      <div className="flex flex-col gap-[8px] w-full mb-side">
        {recommendedQuestions.map((question, idx) => (
          <button
            key={idx}
            disabled={isPending}
            onClick={() => handleQuestionClick(question)}
            className="flex w-[338px] p-[12px_16px] justify-between items-center rounded-sm bg-grey-50 cursor-pointer hover:bg-grey-100 transition-colors disabled:opacity-60"
          >
            <span
              className="text-grey-700 text-left text-e-subheadline"
              style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
            >
              {isPending ? "연결 중..." : question}
            </span>
            <img
              src={chevronIcon}
              alt="이동"
              className="w-icon-sm h-icon-sm shrink-0"
            />
          </button>
        ))}
      </div>

      <div className="w-full">
        <ActionButton
          variant="darkGrey"
          size="md"
          showIcon={false}
          className="w-full bg-grey-800 rounded-sm"
          onClick={handleChatNavigate}
        >
          {buttonText}
        </ActionButton>
      </div>
    </div>
  );
};

export default ChatbotCard;

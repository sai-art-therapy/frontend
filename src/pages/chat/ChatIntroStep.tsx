import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";
import { useAppQuery, useAppMutation } from "../../hooks/apiHooks";
import { getChatSessions, createChatSession } from "../../apis/chat/chat";
import { getChildren } from "../../api/mypage";

import returnIcon from "../../assets/icons/common/return.svg";
import logoIcon from "../../assets/icons/common/logo.svg";
import boyImage from "../../assets/icons/test/boy.png";
import chevronIcon from "../../assets/icons/common/chevron.svg";
import chatIcon from "../../assets/icons/chat/chat.svg";

const formatDate = (isoString: string) => {
  if (!isoString) return "오늘";
  const date = new Date(isoString);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const ChatIntroStep = () => {
  const navigate = useNavigate();

  const { data: sessions = [] } = useAppQuery<any[]>(
    ["chatSessions"],
    getChatSessions,
  );

  const { data: children = [] } = useAppQuery<any[]>(
    ["childrenList"],
    getChildren,
  );

  const { mutate: handleStartNewChat, isPending: isCreating } = useAppMutation<
    any,
    { child_id: number; htp_test_id: number; title: string }
  >((body) => createChatSession(body), {
    onSuccess: (response, variables) => {
      const createdRoomId =
        response && typeof response === "object"
          ? response.session_id || response.id
          : response;

      if (createdRoomId) {
        const isReportChat = !!variables.htp_test_id;

        navigate(`/chat/report/${createdRoomId}`, {
          state: { hasReport: isReportChat },
        });
      } else {
        console.error("방 생성 응답에 ID가 없습니다:", response);
        alert("채팅방 정보가 올바르지 않습니다.");
      }
    },
    onError: (error) => {
      console.error("새 채팅 시작 실패:", error);
      alert("채팅방을 생성하지 못했습니다. 다시 시도해 주세요.");
    },
  });

  const handleGeneralChatClick = () => {
    if (children.length === 0) {
      alert(
        "등록된 자녀 정보가 없습니다. 마이페이지에서 자녀를 먼저 등록해 주세요.",
      );
      return;
    }

    const targetChildId = children[0].child_id;

    handleStartNewChat({
      child_id: targetChildId,
      htp_test_id: null as unknown as number,
      title: "일반 육아 상담",
    });
  };

  return (
    <div className="w-full bg-white font-sans relative min-h-screen">
      <div className="flex h-[68px] w-full items-center justify-start gap-[16px] px-side py-[20px]">
        <img
          src={returnIcon}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
          className="h-[14px] w-[14px] cursor-pointer"
        />
        <h1 className="text-e-title-3 text-grey-900">AI 챗봇</h1>
      </div>

      <main className="flex flex-col px-side pb-[40px]">
        <div className="mt-[24px] flex items-start">
          <img
            src={logoIcon}
            alt="AI 로고"
            className="h-[48px] w-[48px] shrink-0"
          />
          <div className="ml-[16px] flex w-[260px] items-center justify-center rounded-br-[20px] rounded-[20px] rounded-tl-none border border-solid border-grey-200 bg-white p-[16px] gap-[10px]">
            <p className="text-[16px] font-[400] leading-[21px] text-black tracking-[-0.41px] whitespace-pre-line">
              성신님, 반가워요 어떤 리포트를 함께 살펴볼까요? 또는 일반적인 육아
              고민도 편하게 이야기해 주세요.
            </p>
          </div>
        </div>

        <h2 className="mt-[40px] text-[17px] font-[600] leading-[22px] text-black tracking-[-0.41px]">
          최근 리포트로 대화 시작하기
        </h2>

        <div className="mt-[16px] flex w-full flex-col gap-[8px]">
          {sessions.map((session, index) => (
            <button
              key={`session-${session.id || index}`}
              onClick={() =>
                navigate(`/chat/report/${session.session_id || session.id}`, {
                  state: { hasReport: true },
                })
              }
              className="flex w-[370px] cursor-pointer max-w-full items-center justify-between rounded-[12px] bg-grey-50 p-[12px] text-left transition-colors hover:bg-grey-100"
            >
              <div className="flex items-center">
                <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white p-[9.333px_8.667px_9.667px_9.333px] shrink-0">
                  <img
                    src={boyImage}
                    alt="아이 프로필"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="ml-[8px] flex flex-col">
                  <span className="text-[15px] font-[600] leading-[20px] text-black tracking-[-0.24px]">
                    {session.child_name || "자녀 정보 없음"}
                  </span>
                  <div className="flex items-center text-[13px] font-[400] text-black tracking-[-0.08px]">
                    <span>{formatDate(session.created_at)}</span>
                    <span className="mx-[2px]">・</span>
                    <span>{session.test_count || 0}번째 검사</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-[16px]">
                {index === 0 && (
                  <div className="flex items-center justify-center rounded-[4px] border border-solid border-[#C3DFFD] bg-[#EBF4FE] px-[6px] py-[4px]">
                    <span className="text-[12px] font-[600] leading-[16px] text-[#2E90FA]">
                      최근
                    </span>
                  </div>
                )}
                <img
                  src={chevronIcon}
                  alt="이동하기"
                  className="h-[24px] w-[24px] shrink-0"
                />
              </div>
            </button>
          ))}
        </div>

        <ActionButton
          variant="lightOrange"
          size="lg"
          showIcon={false}
          disabled={isCreating}
          onClick={handleGeneralChatClick}
          className="mt-[16px] w-full gap-[6px] font-[600] tracking-[-0.32px]"
        >
          <img
            src={chatIcon}
            alt="채팅 아이콘"
            className="h-[24px] w-[24px] shrink-0"
          />
          리포트 없이 일반 대화하기
        </ActionButton>
      </main>
    </div>
  );
};

export default ChatIntroStep;

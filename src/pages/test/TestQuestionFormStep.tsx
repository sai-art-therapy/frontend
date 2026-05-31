import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query"; // 🌟 캐시 리셋용 추가
import { ActionButton } from "../../components/common/ActionButton";

import returnIcon from "../../assets/icons/common/return.svg";
import referIcon from "../../assets/icons/test/refer.svg";

import { useAppQuery, useAppMutation } from "../../hooks/apiHooks";
import {
  getCurrentPdiQuestion,
  submitPdiAnswer,
  type CurrentPdiQuestionResponse,
} from "../../apis/test/test";

const TestQuestionFormStep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient(); // 🌟 추가

  const testId = location.state?.testId;
  const childId = location.state?.childId;
  const childName = location.state?.childName || "아이";

  const [answer, setAnswer] = useState<string>("");

  const {
    data: currentQuestion,
    isPending,
    isFetching,
    refetch,
  } = useAppQuery<CurrentPdiQuestionResponse>(
    ["currentPdiQuestion", testId],
    () => getCurrentPdiQuestion(Number(testId)),
    {
      enabled: !!testId,
    },
  );

  useEffect(() => {
    if (!testId) {
      alert("검사 정보가 존재하지 않습니다.");
      navigate("/test");
    }
  }, [testId]);

  const { mutate: handleSubmitAnswer, isPending: isSubmitting } =
    useAppMutation<any, any>(
      ({
        tId,
        body,
      }: {
        tId: number;
        body: { question_id: number; answer_text: string; skip: boolean };
      }) => submitPdiAnswer(tId, body),
      {
        onSuccess: async () => {
          setAnswer("");

          // 🌟 [수정] 박자 밀림 해결: 백엔드에 답변을 보낸 뒤, 최신 데이터를 먼저 조회(refetch)해 옵니다.
          const { data: latestData } = await refetch();

          // 🌟 [수정] 방금 가져온 최신 응답 데이터를 기준으로 완료 여부를 판별하여 즉시 반영합니다.
          if (latestData?.completed) {
            navigate("/test-loading-step", {
              state: { testId, childId, childName },
            });
          }
        },
        onError: (error) => {
          console.error("PDI 답변 처리 실패:", error);
          alert("처리에 실패했습니다. 다시 시도해 주세요.");
        },
      },
    );

  const isNextEnabled = answer.trim().length > 0;

  const handleNextFlow = () => {
    if (!currentQuestion?.question?.question_id) return;
    handleSubmitAnswer({
      tId: Number(testId),
      body: {
        question_id: currentQuestion.question.question_id,
        answer_text: answer,
        skip: false,
      },
    });
  };

  const handleSkipFlow = () => {
    if (!currentQuestion?.question?.question_id) return;
    handleSubmitAnswer({
      tId: Number(testId),
      body: {
        question_id: currentQuestion.question.question_id,
        answer_text: "",
        skip: true,
      },
    });
  };

  // 🌟 [추가] 안전한 뒤로가기 핸들러 함수
  const handleBackFlow = () => {
    // 진행중이던 현재 질문 캐시를 초기화해서 뒤로갔다 돌아올 때의 데이터 충돌 에러를 막습니다.
    queryClient.removeQueries({ queryKey: ["currentPdiQuestion", testId] });
    navigate(-1);
  };

  return (
    <div className="flex w-full flex-col bg-white font-sans min-h-screen">
      <div className="flex w-full items-center justify-between px-[24px] pb-[19px] pt-[21px]">
        <span
          className="text-subheadline font-semibold invisible"
          aria-hidden="true"
        >
          9:41
        </span>
        <div
          className="flex items-center gap-[5px] invisible"
          aria-hidden="true"
        >
          <div className="h-[10px] w-[17px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[15px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[24px] rounded-xs bg-black"></div>
        </div>
      </div>

      <div className="flex h-[68px] w-full items-center justify-start gap-[16px] px-side py-[20px]">
        <img
          src={returnIcon}
          alt="뒤로가기"
          onClick={handleBackFlow} // 🌟 [수정] 일반 navigate(-1) 대신 안전 핸들러 바인딩
          className="h-[14px] w-[14px] cursor-pointer"
        />
        <h1 className="text-e-title-3 text-grey-900">미술 심리 검사</h1>
      </div>

      <main className="flex flex-col px-side pb-[140px]">
        {isPending || isFetching || isSubmitting ? (
          <div className="text-center py-[100px] text-grey-400">
            질문을 불러오는 중입니다...
          </div>
        ) : !currentQuestion || !currentQuestion.question ? (
          <div className="text-center py-[100px] text-grey-400">
            진행 중인 질문 데이터를 찾을 수 없습니다.
          </div>
        ) : (
          <>
            {/* 🌟 [수정] 가드 연산자(?.)를 붙여서 데이터가 유실되었을 때 런타임 폭발 에러가 나지 않도록 차단 */}
            <h2 className="mt-[24px] text-left text-[28px] font-[700] leading-[41px] text-[#FF6229] tracking-[0.37px]">
              Q{currentQuestion?.question?.current_step || 1}
            </h2>

            <h3 className="mt-[8px] text-left text-[20px] font-[700] leading-[25px] text-grey-800 tracking-[0.38px]">
              {currentQuestion?.question?.question_text}
            </h3>

            <div className="mt-[41px] flex h-[300px] w-full rounded-[8px] border border-solid border-grey-200 bg-white p-[16px] transition-all focus-within:border-grey-800">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="답변을 입력해주세요"
                className="h-full w-full resize-none bg-transparent p-0 outline-none text-body-1 text-grey-800 placeholder:text-grey-300 font-sans leading-[24px]"
              />
            </div>
          </>
        )}

        <div className="mt-[16px] flex w-full items-center gap-[8px] rounded-[8px] bg-warning-100 p-[8px]">
          <img
            src={referIcon}
            alt="참고"
            className="h-[24px] w-[24px] shrink-0"
          />
          <span className="text-[13px] font-[400] leading-[18px] text-grey-900 tracking-[-0.08px]">
            답변이 어렵다면 '건너뛰기'를 눌러주세요.
          </span>
        </div>
      </main>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[402px] -translate-x-1/2 bg-white px-side pb-[32px] pt-[16px]">
        <div className="flex w-full items-center gap-[16px]">
          <ActionButton
            variant="lightGrey"
            size="xl"
            showIcon={false}
            className="flex-1"
            disabled={isPending || isSubmitting || !currentQuestion?.question}
            onClick={handleSkipFlow}
          >
            건너뛰기
          </ActionButton>

          <ActionButton
            variant="darkGrey"
            size="xl"
            showIcon={false}
            disabled={
              !isNextEnabled ||
              isPending ||
              isSubmitting ||
              !currentQuestion?.question
            }
            className="flex-1"
            onClick={handleNextFlow}
          >
            {currentQuestion?.completed ? "완료" : "다음"}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default TestQuestionFormStep;

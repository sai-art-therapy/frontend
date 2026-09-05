import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";

import returnIcon from "../../assets/icons/common/return.svg";
import heartCheckIcon from "../../assets/icons/test/heartcheck.svg";
import sparkleIcon from "../../assets/icons/test/sparkle.svg";
import referIcon from "../../assets/icons/test/refer.svg";

import { useAppMutation } from "../../hooks/apiHooks";
import {
  startPdiQuestions,
  skipAllPdiQuestions,
  type PdiQuestion,
} from "../../apis/test/test";

const TestQuestionIntroStep = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const testId = location.state?.testId;
  const childId = location.state?.childId;
  const childName = location.state?.childName || "아이";
  const reportId = location.state?.reportId;
  const imageFile = location.state?.imageFile;
  const imageUrl = location.state?.imageUrl;

  const [questions, setQuestions] = useState<PdiQuestion[]>([]);

  // React StrictMode에서 effect가 두 번 실행되어 PDI 시작 API가 중복 호출되는 것을 방지
  const hasStartedRef = useRef(false);

  const { mutate: handleStartPdi, isPending } = useAppMutation<any, any>(
    (tId: number) => startPdiQuestions(tId),
    {
      onSuccess: (data) => {
        console.log("PDI 질문 생성 성공:", data);
        if (data && data.questions) {
          setQuestions(data.questions);
        }
      },
      onError: (error) => {
        console.error("PDI 질문 생성 실패:", error);
        alert(
          "진행할 수 없는 상태이거나 오류가 발생했습니다. 검사 목록으로 이동합니다.",
        );
        navigate("/test", { replace: true });
      },
    },
  );

  const { mutate: handleSkipAllPdi, isPending: isSkipping } = useAppMutation<
    any,
    any
  >((tId: number) => skipAllPdiQuestions(tId), {
    onSuccess: () => {
      console.log("PDI 전체 건너뛰기 성공");
      navigate("/test-result", {
        state: { testId, childId, childName, reportId, imageFile, imageUrl },
      });
    },
    onError: (error) => {
      console.error("PDI 전체 건너뛰기 실패:", error);
      alert("처리에 실패했습니다. 다시 시도해 주세요.");
    },
  });

  useEffect(() => {
    if (!testId) {
      alert("검사 정보가 존재하지 않습니다.");
      navigate("/test");
      return;
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    handleStartPdi(Number(testId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  return (
    <div className="flex w-full flex-col bg-white font-sans min-h-screen">
      <div className="flex h-[68px] w-full items-center justify-start gap-[16px] px-side py-[20px]">
        <img
          src={returnIcon}
          alt="뒤로가기"
          onClick={() => {
            if (isPending || isSkipping) return;
            const confirmExit = window.confirm(
              "지금 나가시면 진행 중인 검사가 중단될 수 있습니다.\n정말 나가시겠습니까?",
            );
            if (confirmExit) {
              navigate("/test", { replace: true });
            }
          }}
          className={`h-[14px] w-[14px] ${isPending || isSkipping ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        />
        <h1 className="text-e-title-3 text-grey-900">미술 심리 검사</h1>
      </div>

      <main className="flex flex-col items-center px-side pb-[140px]">
        <img
          src={heartCheckIcon}
          alt="하트 체크"
          className="mt-[24px] h-[80px] w-[80px]"
        />

        <h2 className="mt-[16px] text-center text-e-title-1 text-grey-800 tracking-[0.36px] whitespace-pre-line">
          아래 몇 가지 질문에 {"\n"}답해 주실 수 있나요?
        </h2>
        <p className="mt-[8px] text-center text-subheadline text-grey-700 tracking-[-0.24px]">
          질문의 답변으로 더 정교한 분석이 가능해요.
        </p>

        <div className="mt-[41px] flex w-full flex-col gap-[16px] rounded-[12px] bg-grey-50 p-[16px]">
          <div className="flex items-center gap-[8px]">
            <img
              src={sparkleIcon}
              alt="스파클"
              className="h-[18px] w-[18px] shrink-0"
            />
            <span className="text-e-subheadline font-[600] text-black tracking-[-0.24px]">
              아이의 그림에서 찾은 질문들
            </span>
          </div>

          <div className="flex flex-col gap-[8px]">
            {isPending ? (
              <div className="text-center py-[20px] text-[13px] text-grey-400">
                아이의 맞춤형 질문을 생성하고 있어요...
              </div>
            ) : questions.length === 0 ? (
              <div className="text-center py-[20px] text-[13px] text-grey-400">
                생성된 질문이 없습니다.
              </div>
            ) : (
              questions.map((question, index) => (
                <div
                  key={question.question_id || index}
                  className="flex items-start"
                >
                  <span className="w-[32px] shrink-0 text-[15px] font-[600] leading-[20px] text-grey-700 tracking-[-0.24px]">
                    Q{index + 1}.
                  </span>
                  <span className="text-[13px] font-[400] leading-[18px] text-grey-700 tracking-[-0.08px]">
                    {question.question_text}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-[16px] flex w-full items-center gap-[8px] rounded-[8px] bg-warning-100 p-[8px]">
          <img
            src={referIcon}
            alt="참고"
            className="h-[24px] w-[24px] shrink-0"
          />
          <span className="text-[13px] font-[400] leading-[18px] text-grey-900 tracking-[-0.08px]">
            모든 질문에 답변하지 않아도 괜찮아요.
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
            disabled={isPending || isSkipping}
            onClick={() => handleSkipAllPdi(Number(testId))}
          >
            건너뛰기
          </ActionButton>

          <ActionButton
            variant="darkGrey"
            size="xl"
            showIcon={false}
            className="flex-1"
            disabled={isPending || isSkipping || questions.length === 0}
            onClick={() =>
              navigate("/test-question-form-step", {
                state: {
                  testId,
                  childId,
                  childName,
                  questions,
                  reportId,
                  imageFile,
                  imageUrl,
                },
              })
            }
          >
            답변할게요
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default TestQuestionIntroStep;

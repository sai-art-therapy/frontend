import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";

import returnIcon from "../../assets/icons/common/return.svg";
import heartCheckIcon from "../../assets/icons/test/heartcheck.svg";
import sparkleIcon from "../../assets/icons/test/sparkle.svg";
import referIcon from "../../assets/icons/test/refer.svg";

const TestQuestionIntroStep = () => {
  const navigate = useNavigate();

  const mockQuestions = [
    "아이가 친구들과 어울릴 때 어떤 모습인가요?",
    "아이가 친구들과 어울릴 때 어떤 모습인가요?",
    "아이가 친구들과 어울릴 때 어떤 모습인가요?",
    "아이가 친구들과 어울릴 때 어떤 모습인가요?",
    "아이가 친구들과 어울릴 때 어떤 모습인가요?",
    "아이가 친구들과 어울릴 때 어떤 모습인가요?",
    "아이가 친구들과 어울릴 때 어떤 모습인가요?",
  ];

  return (
    <div className="flex w-full flex-col bg-white font-sans min-h-screen">
      <div className="flex w-full items-center justify-between px-[24px] pb-[19px] pt-[21px]">
        <span className="text-subheadline font-semibold text-black">9:41</span>
        <div className="flex items-center gap-[5px]">
          <div className="h-[10px] w-[17px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[15px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[24px] rounded-xs bg-black"></div>
        </div>
      </div>

      <div className="flex h-[68px] w-full items-center justify-start gap-[16px] px-side py-[20px]">
        <img
          src={returnIcon}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
          className="h-[14px] w-[14px] cursor-pointer"
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
            {mockQuestions.map((question, index) => (
              <div key={index} className="flex items-start">
                <span className="w-[32px] shrink-0 text-[15px] font-[600] leading-[20px] text-grey-700 tracking-[-0.24px]">
                  Q{index + 1}.
                </span>
                <span className="text-[13px] font-[400] leading-[18px] text-grey-700 tracking-[-0.08px]">
                  {question}
                </span>
              </div>
            ))}
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
          {/* 건너뛰기 버튼 */}
          <ActionButton
            variant="lightGrey"
            size="xl"
            showIcon={false}
            className="flex-1"
            onClick={() => navigate("/test-loading-step")} // 임시 라우팅 경로
          >
            건너뛰기
          </ActionButton>

          {/* 답변할게요 버튼 */}
          <ActionButton
            variant="darkGrey"
            size="xl"
            showIcon={false}
            className="flex-1"
            onClick={() => navigate("/test-question-form-step")} // 임시 라우팅 경로
          >
            답변할게요
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default TestQuestionIntroStep;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";

import returnIcon from "../../assets/icons/common/return.svg";
import referIcon from "../../assets/icons/test/refer.svg";

const TestQuestionFormStep = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<string>("");

  const isNextEnabled = answer.trim().length > 0;

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

      <main className="flex flex-col px-side pb-[140px]">
        <h2 className="mt-[24px] text-left text-[28px] font-[700] leading-[41px] text-[#FF6229] tracking-[0.37px]">
          Q1
        </h2>

        <h3 className="mt-[8px] text-left text-[20px] font-[700] leading-[25px] text-grey-800 tracking-[0.38px]">
          아이가 친구들과 어울릴 때 어떤 모습인가요?
        </h3>

        <div className="mt-[41px] flex h-[300px] w-full rounded-[8px] border border-solid border-grey-200 bg-white p-[16px] transition-all focus-within:border-grey-800">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="답변을 입력해주세요"
            className="h-full w-full resize-none bg-transparent p-0 outline-none text-body-1 text-grey-800 placeholder:text-grey-300 font-sans leading-[24px]"
          />
        </div>

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
          {/* 건너뛰기 버튼 */}
          <ActionButton
            variant="lightGrey"
            size="xl"
            showIcon={false}
            className="flex-1"
            onClick={() => navigate("/test-loading-step")}
          >
            건너뛰기
          </ActionButton>

          {/* 다음 버튼 */}
          <ActionButton
            variant="darkGrey"
            size="xl"
            showIcon={false}
            disabled={!isNextEnabled}
            className="flex-1"
            onClick={() => navigate("/test-result")}
          >
            다음
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default TestQuestionFormStep;

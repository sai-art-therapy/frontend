import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";
import { TextField } from "../../components/common/Textfield";

import returnIcon from "../../assets/icons/common/return.svg";
import timeIcon from "../../assets/icons/test/time.svg";

const TestTimeInputStep = () => {
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");

  const isNextEnabled = minutes.trim().length > 0 || seconds.trim().length > 0;

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

      {/* 헤더 영역 */}
      <div className="flex h-[68px] w-full items-center justify-start gap-[16px] px-side py-[20px]">
        <img
          src={returnIcon}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
          className="h-[14px] w-[14px] cursor-pointer"
        />
        <h1 className="text-e-title-3 text-grey-900">미술 심리 검사</h1>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex flex-col items-center px-side pb-[120px]">
        <img
          src={timeIcon}
          alt="시계 아이콘"
          className="mt-[90px] h-[80px] w-[80px]"
        />

        {/* 타이틀 및 서브텍스트 명시 */}
        <h2 className="mt-[16px] text-center text-e-title-1 text-grey-800 tracking-[0.36px]">
          얼마나 걸렸나요?
        </h2>
        <p className="mt-[8px] text-center text-subheadline text-grey-700 tracking-[-0.24px]">
          그리기 시작부터 완성까지의 시간을 입력해주세요
        </p>

        <div className="mt-[24px] flex items-center justify-center w-full">
          <div className="flex items-center gap-[8px]">
            {/* 분 */}
            <TextField
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder=""
              className="!w-[139px] text-center"
            />
            <span className="text-e-title-3 text-sub-500 text-center tracking-[0.38px]">
              분
            </span>

            <span className="mx-[8px] text-[28px] font-700 leading-[41px] text-black tracking-[0.37px]">
              :
            </span>

            {/* 초 */}
            <TextField
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              placeholder=""
              className="!w-[139px] text-center"
            />
            <span className="text-e-title-3 text-sub-500 tracking-[0.38px]">
              초
            </span>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[402px] -translate-x-1/2 bg-white px-side pb-[32px] pt-[16px]">
        <div className="flex w-full items-center gap-[16px]">
          <ActionButton
            variant="lightGrey"
            size="xl"
            showIcon={false}
            className="flex-1"
            onClick={() => navigate("/test-third-step")}
          >
            건너뛰기
          </ActionButton>

          <ActionButton
            variant="darkGrey"
            size="xl"
            showIcon={false}
            disabled={!isNextEnabled}
            className="flex-1"
            onClick={() => navigate("/test-question-intro-step")}
          >
            다음
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default TestTimeInputStep;

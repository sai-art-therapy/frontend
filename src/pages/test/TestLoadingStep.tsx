import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import imagecheckIcon from "../../assets/icons/test/imagecheck.svg";

const TestLoadingStep = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans">
      <style>
        {`
          @keyframes scanLine {
            0% { top: 0px; }
            50% { top: calc(100% - 2px); }
            100% { top: 0px; }
          }
          .animate-scan {
            animation: scanLine 2s ease-in-out infinite;
          }
        `}
      </style>

      <div className="flex w-full items-center justify-between px-[24px] pb-[19px] pt-[21px]">
        <span className="text-subheadline font-semibold text-black">9:41</span>
        <div className="flex items-center gap-[5px]">
          <div className="h-[10px] w-[17px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[15px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[24px] rounded-xs bg-black"></div>
        </div>
      </div>

      <div className="mt-[195px] flex flex-col items-center">
        {/* 애니메이션 박스 */}
        <div className="relative flex aspect-square w-[160px] flex-col items-center justify-center overflow-hidden rounded-md bg-main-100 py-[30px]">
          <img
            src={imagecheckIcon}
            alt="그림 확인"
            className="h-[100px] w-[100px]"
          />
          {/* 주황색 스캔 선 */}
          <div className="animate-scan absolute left-0 h-[2px] w-[160px] bg-main-600"></div>
        </div>

        <h1 className="mt-[48px] line-clamp-2 text-center text-[24px] font-bold leading-[34px] tracking-[0.36px] text-grey-900 whitespace-pre-line">
          길동이의 그림을{"\n"}꼼꼼히 살펴보고 있어요
        </h1>

        <p className="mt-[8px] text-center text-subheadline text-grey-600">
          약 30초 정도 걸려요
        </p>

        {/* 진행바 */}
        <div className="mt-[48px] h-[8px] w-[280px] overflow-hidden rounded-full bg-grey-200">
          <div
            className="h-full bg-main-500 transition-all ease-linear"
            style={{
              width: `${progress}%`,
              transitionDuration: "30000ms",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TestLoadingStep;

import React from "react";

import homePencilIcon from "../../assets/icons/home/home-pencil.svg";
import homeCameraIcon from "../../assets/icons/home/home-camera.svg";
import homeChatIcon from "../../assets/icons/home/home-chat.svg";
import homePaperIcon from "../../assets/icons/home/home-paper.svg";
import chevronIcon from "../../assets/icons/common/chevron.svg";

const StepGuide: React.FC = () => {
  return (
    <div className="flex p-[8px_12px] justify-between items-center self-stretch mt-[24px] mb-side bg-white">
      {/* 그림 그리기 */}
      <div className="flex flex-col items-center">
        <div className="flex w-[36px] h-[36px] justify-center items-center rounded-full bg-grey-50">
          <img
            src={homePencilIcon}
            alt="그림"
            className="w-icon-xs h-icon-xs"
          />
        </div>
        <span className="mt-[8px] text-grey-800 text-e-footnote">
          그림 그리기
        </span>
      </div>
      <img
        src={chevronIcon}
        alt="다음"
        className="w-icon-xs h-icon-xs text-grey-300"
      />

      {/* 사진 업로드 */}
      <div className="flex flex-col items-center">
        <div className="flex w-[36px] h-[36px] justify-center items-center rounded-full bg-grey-50">
          <img
            src={homeCameraIcon}
            alt="업로드"
            className="w-icon-xs h-icon-xs"
          />
        </div>
        <span className="mt-[8px] text-grey-800 text-e-footnote">
          사진 업로드
        </span>
      </div>
      <img
        src={chevronIcon}
        alt="다음"
        className="w-icon-xs h-icon-xs text-grey-300"
      />

      {/* AI 분석 */}
      <div className="flex flex-col items-center">
        <div className="flex w-[36px] h-[36px] justify-center items-center rounded-full bg-grey-50">
          <img src={homeChatIcon} alt="분석" className="w-icon-xs h-icon-xs" />
        </div>
        <span className="mt-[8px] text-grey-800 text-e-footnote">AI 분석</span>
      </div>
      <img
        src={chevronIcon}
        alt="다음"
        className="w-icon-xs h-icon-xs text-grey-300"
      />

      {/* 결과 확인 */}
      <div className="flex flex-col items-center">
        <div className="flex w-[36px] h-[36px] justify-center items-center rounded-full bg-grey-50">
          <img src={homePaperIcon} alt="결과" className="w-icon-xs h-icon-xs" />
        </div>
        <span className="mt-[8px] text-grey-800 text-e-footnote">
          결과 확인
        </span>
      </div>
    </div>
  );
};

export default StepGuide;

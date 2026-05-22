import React from "react";
import floatingbuttonIcon from "../../assets/icons/common/floatingbutton.svg";

interface FloatingButtonProps {
  onClick?: () => void;
}

export const FloatingButton = ({ onClick }: FloatingButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-[120px] left-1/2 z-50 flex h-[56px] w-[56px] -translate-x-1/2 translate-x-[131px] items-center justify-center rounded-full bg-main-500 p-[12px] transition-transform active:scale-95 m-auto max-w-[402px]"
      aria-label="플로팅 액션 버튼"
    >
      <img
        src={floatingbuttonIcon}
        alt="floating action"
        className="h-icon-md w-icon-md"
      />
    </button>
  );
};

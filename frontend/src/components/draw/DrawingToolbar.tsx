import React from "react";
import returnDrawIcon from "../../assets/icons/draw/returndraw.svg";

interface DrawingToolbarProps {
  onUndo: () => void;
  onClearAll: () => void;
  canUndo: boolean;
  canClearAll: boolean;
}

export const DrawingToolbar: React.FC<DrawingToolbarProps> = ({
  onUndo,
  onClearAll,
  canUndo,
  canClearAll,
}) => {
  return (
    <div className="flex items-center justify-between px-[16px] py-[8px]">
      <button
        type="button"
        onClick={onClearAll}
        disabled={!canClearAll}
        className="flex h-[36px] cursor-pointer items-center justify-center rounded-[1000px] bg-grey-50 px-[14px] text-e-footnote text-grey-700 transition-colors active:bg-grey-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        전체 지우기
      </button>

      <button
        type="button"
        onClick={onUndo}
        disabled={!canUndo}
        className="flex h-[52px] w-[52px] aspect-square cursor-pointer items-center justify-center rounded-[1000px] bg-grey-50 p-[14px] transition-colors active:bg-grey-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="되돌리기"
      >
        <span
          className="block h-[24px] w-[24px] shrink-0 bg-grey-800"
          style={{
            maskImage: `url("${returnDrawIcon}")`,
            WebkitMaskImage: `url("${returnDrawIcon}")`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      </button>
    </div>
  );
};

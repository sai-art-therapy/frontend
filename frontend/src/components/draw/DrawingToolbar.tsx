import React from "react";
import returnDrawIcon from "../../assets/icons/draw/returndraw.svg";
import eraserIcon from "../../assets/icons/draw/eraser.svg";
import penIcon from "../../assets/icons/draw/pencil.svg";

export type ToolType = "pen" | "eraser";

interface DrawingToolbarProps {
  activeTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  onUndo?: () => void;
}

export const DrawingToolbar: React.FC<DrawingToolbarProps> = ({
  activeTool,
  onSelectTool,
  onUndo,
}) => {
  return (
    <div className="flex items-center justify-end px-[16px] py-[8px] pr-[20px]">
      {/* 되돌리기 버튼 */}
      <button
        onClick={onUndo}
        className="flex w-[52px] h-[52px] p-[14px] justify-center items-center aspect-square rounded-[1000px] bg-grey-50 active:bg-grey-100 transition-colors cursor-pointer"
        aria-label="되돌리기"
      >
        <span
          className="block w-[24px] h-[24px] shrink-0 bg-grey-800"
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

      <div className="ml-[9px] flex p-[6px] items-center gap-[6px] rounded-[1000px] bg-grey-50">
        {/* 지우개 버튼 */}
        <button
          onClick={() => onSelectTool("eraser")}
          className={`flex w-[40px] h-[40px] p-[8px] justify-center items-center aspect-square rounded-[1000px] transition-colors cursor-pointer ${
            activeTool === "eraser"
              ? "bg-main-100 text-main-500"
              : "bg-grey-50 text-grey-600"
          }`}
          aria-label="지우개"
        >
          <span
            className={`block w-[24px] h-[24px] shrink-0 ${
              activeTool === "eraser" ? "bg-main-500" : "bg-grey-600"
            }`}
            style={{
              maskImage: `url("${eraserIcon}")`,
              WebkitMaskImage: `url("${eraserIcon}")`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </button>

        {/* 그리기 버튼 */}
        <button
          onClick={() => onSelectTool("pen")}
          className={`flex w-[40px] h-[40px] p-[8px] justify-center items-center aspect-square rounded-[1000px] transition-colors cursor-pointer ${
            activeTool === "pen"
              ? "bg-main-100 text-main-500"
              : "bg-grey-50 text-grey-600"
          }`}
          aria-label="그리기"
        >
          <span
            className={`block w-[24px] h-[24px] shrink-0 ${
              activeTool === "pen" ? "bg-main-500" : "bg-grey-600"
            }`}
            style={{
              maskImage: `url("${penIcon}")`,
              WebkitMaskImage: `url("${penIcon}")`,
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
    </div>
  );
};

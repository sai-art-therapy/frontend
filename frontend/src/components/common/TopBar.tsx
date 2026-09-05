import React from "react";
import searchIcon from "../../assets/icons/common/search.svg?url";
import returnIcon from "../../assets/icons/common/return.svg?url";

export type TopBarVariant = "search" | "action" | "back" | "none";

interface TopBarProps {
  variant?: TopBarVariant;
  title: string;
  rightText?: string;
  isActionDisabled?: boolean;
  onBackClick?: () => void;
  onRightAction?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  variant = "search",
  title,
  rightText = "Text",
  isActionDisabled = false,
  onBackClick,
  onRightAction,
}) => {
  const showBackButton = variant === "action" || variant === "back";

  return (
    <header
      className={`flex items-center bg-white w-full h-[68px] px-[16px] py-[20px] ${
        variant === "search" ? "justify-between" : ""
      }`}
    >
      <div
        className={`flex items-center ${showBackButton ? "gap-[16px]" : ""}`}
      >
        {showBackButton && (
          <button onClick={onBackClick} className="w-[15px] h-[15px] shrink-0">
            <span
              className="block w-full h-full bg-grey-800"
              style={{
                maskImage: `url("${returnIcon}")`,
                WebkitMaskImage: `url("${returnIcon}")`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskPosition: "center",
                WebkitMaskPosition: "center",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            />
          </button>
        )}
        <h1 className="text-e-title-2 text-grey-800 line-clamp-1">{title}</h1>
      </div>

      <div className={variant === "action" ? "ml-auto" : ""}>
        {variant === "search" && (
          <button
            onClick={onRightAction}
            className="w-[18px] h-[18px] shrink-0"
          >
            <span
              className="block w-full h-full bg-grey-800"
              style={{
                maskImage: `url("${searchIcon}")`,
                WebkitMaskImage: `url("${searchIcon}")`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskPosition: "center",
                WebkitMaskPosition: "center",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            />
          </button>
        )}

        {variant === "action" && (
          <button
            onClick={onRightAction}
            disabled={isActionDisabled}
            className={`text-e-body-1 whitespace-nowrap ${
              isActionDisabled ? "text-grey-300" : "text-main-500"
            }`}
          >
            {rightText}
          </button>
        )}
      </div>
    </header>
  );
};

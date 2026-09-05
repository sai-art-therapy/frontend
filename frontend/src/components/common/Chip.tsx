import React from "react";
import dropIcon from "../../assets/icons/common/drop.svg?url";
import xIcon from "../../assets/icons/common/x.svg?url";

export type ChipTheme =
  | "solid-light" // 밝은 회색 (Grey100)
  | "solid-light-active" // 밝은 회색 활성 (Grey200)
  | "solid-dark" // 검정색 (Grey800)
  | "solid-dark-active" // 검정색 활성 (Grey600)
  | "outline-grey" // 회색 테두리 (Grey50)
  | "outline-grey-active" // 회색 테두리 활성 (Grey200)
  | "outline-primary" // 주황색 테두리 (Ember100)
  | "outline-primary-active"; // 주황색 테두리 활성 (Ember200)

export type ChipSize = "medium" | "large";
export type ChipIcon = "none" | "drop" | "x";

interface ChipProps {
  label: string;
  theme?: ChipTheme;
  size?: ChipSize;
  icon?: ChipIcon;
  disabled?: boolean;
  onClick?: () => void;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  theme = "solid-light",
  size = "medium",
  icon = "none",
  disabled = false,
  onClick,
}) => {
  const getColorClasses = () => {
    if (disabled) {
      return "bg-grey-50 text-grey-300 border border-transparent cursor-not-allowed";
    }

    switch (theme) {
      /* 첫 번째/세 번째 유형 */
      case "solid-light":
        return "bg-grey-100 text-grey-500 border border-transparent";
      case "solid-light-active":
        return "bg-grey-200 text-grey-500 border border-transparent";
      case "solid-dark":
        return "bg-grey-800 text-white border border-transparent";
      case "solid-dark-active":
        return "bg-grey-600 text-white border border-transparent";

      /* 두 번째 유형 */
      case "outline-grey":
        return "bg-grey-50 text-grey-500 border border-grey-200";
      case "outline-grey-active":
        return "bg-grey-200 text-grey-500 border border-grey-200";
      case "outline-primary":
        return "bg-main-100 text-main-500 border border-main-500";
      case "outline-primary-active":
        return "bg-main-200 text-main-500 border border-main-500";
      default:
        return "";
    }
  };

  const getLayoutClasses = () => {
    if (size === "large") {
      return "px-[12px] py-[8px] gap-[10px] text-e-body-2";
    } else {
      if (icon !== "none") {
        return "pl-[12px] pr-[10px] py-[6px] gap-[6px] text-e-subheadline";
      } else {
        return "px-[12px] py-[6px] gap-[10px] text-e-subheadline";
      }
    }
  };

  const iconUrl = icon === "drop" ? dropIcon : icon === "x" ? xIcon : null;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full transition-colors whitespace-nowrap ${getColorClasses()} ${getLayoutClasses()}`}
    >
      <span>{label}</span>

      {iconUrl && (
        <div
          className="w-[10px] h-[10px] shrink-0 bg-current"
          style={{
            maskImage: `url("${iconUrl}")`,
            WebkitMaskImage: `url("${iconUrl}")`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      )}
    </button>
  );
};

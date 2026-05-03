import React, { type ButtonHTMLAttributes } from "react";
import dropIcon from "../../assets/icons/common/drop.svg?url";

export interface DropdownProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "value" | "className"
> {
  value?: string;
  placeholder?: string;
  isOpen?: boolean;
  isError?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  placeholder = "레이블",
  isOpen = false,
  isError = false,
  disabled = false,
  onClick,
  ...props
}) => {
  const hasValue = value !== undefined && value.trim().length > 0;
  const displayText = hasValue ? value : placeholder;

  const getContainerClasses = () => {
    if (disabled) {
      return "h-[52px] border border-grey-200 bg-grey-100 px-[16px] py-[8px]";
    }
    if (isError) {
      return "border border-error-500 bg-white px-[16px] py-[14px]";
    }
    if (isOpen) {
      return "border-2 border-grey-800 bg-white px-[16px] py-[14px]";
    }
    return "border border-grey-200 bg-white px-[16px] py-[14px]";
  };

  const getTextClasses = () => {
    if (disabled) return "text-grey-300";
    if (hasValue) return "text-grey-900";
    return "text-grey-400";
  };

  const getIconColor = () => {
    if (disabled) return "text-grey-300";
    return "text-grey-600";
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex w-[280px] items-center justify-between rounded-sm outline-none transition-all ${getContainerClasses()}`}
      {...props}
    >
      <span
        className={`flex-1 text-left text-body-1 ${getTextClasses()} truncate`}
      >
        {displayText}
      </span>

      <div
        className={`flex h-[14px] w-[14px] shrink-0 items-center justify-center transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        } ${getIconColor()}`}
      >
        <div
          className="h-full w-full bg-current"
          style={{
            maskImage: `url("${dropIcon}")`,
            WebkitMaskImage: `url("${dropIcon}")`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      </div>
    </button>
  );
};

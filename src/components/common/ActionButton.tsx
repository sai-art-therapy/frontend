import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
import plusIcon from "../../assets/icons/common/plus.svg?url";

// 12가지 색상 타입 정의
export type ActionButtonVariant =
  | "darkGrey"
  | "mediumGrey"
  | "grey"
  | "lightGrey"
  | "orange"
  | "mediumOrange"
  | "lightOrange"
  | "darkRed"
  | "mediumRed"
  | "lightRed"
  | "mediumGreen"
  | "lightGreen";

// 4가지 크기 타입 정의
export type ActionButtonSize = "xl" | "lg" | "md" | "sm";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
  showIcon?: boolean; // 아이콘 표시 여부 (기본값: true)
}

// 크기 스타일 매핑
const sizeStyles: Record<ActionButtonSize, string> = {
  xl: "h-[54px] py-[15px] px-[16px] rounded-[8px] text-e-body-1",
  lg: "h-[48px] p-[12px] rounded-[8px] text-e-body-2",
  md: "h-[42px] py-[9px] px-[10px] rounded-[8px] text-e-subheadline",
  sm: "h-[30px] py-[6px] px-[8px] rounded-[6px] text-e-footnote",
};

// 색상 스타일 매핑
const variantStyles: Record<ActionButtonVariant, string> = {
  darkGrey: "bg-grey-800 text-white",
  mediumGrey: "bg-grey-600 text-white",
  grey: "bg-grey-300 text-grey-600",
  lightGrey: "bg-grey-100 text-grey-600",
  orange: "bg-main-500 text-white",
  mediumOrange: "bg-main-200 text-main-500",
  lightOrange: "bg-main-100 text-main-500",
  darkRed: "bg-main-700 text-white",
  mediumRed: "bg-error-200 text-error-500",
  lightRed: "bg-error-100 text-error-500",
  mediumGreen: "bg-success-200 text-success-500",
  lightGreen: "bg-success-100 text-success-500",
};

// 아이콘 크기 매핑
const iconSizes: Record<ActionButtonSize, string> = {
  xl: "w-[24px] h-[24px]",
  lg: "w-[24px] h-[24px]",
  md: "w-[24px] h-[24px]",
  sm: "w-[18px] h-[18px]",
};

export const ActionButton = React.forwardRef<
  HTMLButtonElement,
  ActionButtonProps
>(
  (
    {
      className = "",
      variant = "darkGrey",
      size = "xl",
      showIcon = true,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-[6px] transition-colors disabled:bg-grey-100 disabled:text-grey-300 disabled:cursor-not-allowed";

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {showIcon && (
          <span
            className={`${iconSizes[size]} bg-current inline-block shrink-0`}
            style={{
              maskImage: `url("${plusIcon}")`,
              WebkitMaskImage: `url("${plusIcon}")`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        )}
        {children}
      </button>
    );
  },
);

ActionButton.displayName = "ActionButton";

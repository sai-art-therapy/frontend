import React, { type HTMLAttributes, type ReactNode } from "react";

// 3가지 형태 (테두리 없음 연한색, 테두리 있음 연한색, 진한색)
export type TagVariant = "soft" | "outline" | "solid";

// 6가지 색상 테마
export type TagColor = "red" | "yellow" | "green" | "orange" | "blue" | "grey";

// 3가지 크기
export type TagSize = "lg" | "md" | "sm";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  color?: TagColor;
  size?: TagSize;
  children?: ReactNode;
}

const sizeStyles: Record<TagSize, string> = {
  lg: "px-[6px] py-[4px] text-e-footnote",
  md: "px-[6px] py-[4px] text-e-caption-1",
  sm: "px-[4px] py-[2px] text-e-caption-1",
};

const colorStyles: Record<TagVariant, Record<TagColor, string>> = {
  soft: {
    red: "bg-error-100 text-error-500",
    yellow: "bg-warning-100 text-warning-500",
    green: "bg-success-100 text-success-500",
    orange: "bg-main-100 text-main-500",
    blue: "bg-sub-100 text-sub-500",
    grey: "bg-grey-100 text-grey-600",
  },
  outline: {
    red: "bg-error-100 text-error-500 border border-error-200",
    yellow: "bg-warning-100 text-warning-500 border border-warning-200",
    green: "bg-success-100 text-success-500 border border-success-200",
    orange: "bg-main-100 text-main-500 border border-main-200",
    blue: "bg-sub-100 text-sub-500 border border-sub-200",
    grey: "bg-grey-100 text-grey-600 border border-grey-200",
  },
  solid: {
    red: "bg-error-500 text-white",
    yellow: "bg-warning-500 text-white",
    green: "bg-success-500 text-white",
    orange: "bg-main-500 text-white",
    blue: "bg-sub-500 text-white",
    grey: "bg-grey-500 text-white",
  },
};

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className = "",
      variant = "soft",
      color = "grey",
      size = "lg",
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-[10px] rounded-[4px] whitespace-nowrap";

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${sizeStyles[size]} ${colorStyles[variant][color]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Tag.displayName = "Tag";

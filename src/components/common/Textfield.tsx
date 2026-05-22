import React, { type InputHTMLAttributes } from "react";
import closeIcon from "../../assets/icons/common/close.svg?url";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "clearable";
  isError?: boolean;
  onClear?: () => void;
}

export const TextField: React.FC<TextFieldProps> = ({
  variant = "default",
  isError = false,
  disabled = false,
  value,
  onChange,
  onClear,
  placeholder,
  className = "",
  ...props
}) => {
  const hasText = value !== undefined && String(value).length > 0;
  const showClear = variant === "clearable" && hasText && !disabled;

  const getContainerClasses = () => {
    if (disabled)
      return "border-grey-200 bg-grey-100 px-[16px] py-[15px] gap-[10px]";
    if (isError)
      return "border-error-500 bg-error-100 px-[16px] py-[15px] gap-[10px]";

    if (variant === "clearable") {
      if (hasText)
        return "border-grey-800 bg-white px-[16px] py-[14px] gap-[4px]";
      return "border-grey-200 bg-white px-[16px] py-[15px] gap-[10px]";
    }

    return "border-grey-200 bg-white px-[16px] py-[15px] gap-[10px]";
  };

  const getTextClasses = () => {
    if (disabled) return "text-grey-300 placeholder:text-grey-300";
    if (isError) return "text-error-500 placeholder:text-error-500";
    return "text-grey-800 placeholder:text-grey-300";
  };

  return (
    <div
      className={`flex w-[280px] items-center rounded-sm border border-solid transition-all ${getContainerClasses()} ${className}`}
    >
      <input
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`flex-1 bg-transparent p-0 outline-none text-body-1 ${getTextClasses()} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        {...props}
      />

      {showClear && (
        <button
          type="button"
          onClick={onClear}
          className="flex h-[24px] w-[24px] shrink-0 items-center justify-center text-grey-300 transition-colors hover:text-grey-800 mr-[8px]"
        >
          <div
            className="h-full w-full bg-current"
            style={{
              maskImage: `url("${closeIcon}")`,
              WebkitMaskImage: `url("${closeIcon}")`,
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
    </div>
  );
};

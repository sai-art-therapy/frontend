import React, { type InputHTMLAttributes, useState } from "react";
import searchIcon from "../../assets/icons/common/search.svg?url";
import closeIcon from "../../assets/icons/common/close.svg?url";

export interface SearchBarProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> {
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = "검색어를 입력해주세요",
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasText = value !== undefined && String(value).length > 0;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const getType = () => {
    if (isFocused) return 2;
    if (hasText) return 3;
    return 1;
  };

  const type = getType();

  const getContainerClasses = () => {
    if (type === 1) {
      return "flex-row px-[16px] py-[14px] bg-grey-50 border border-transparent items-center";
    }
    if (type === 2) {
      return "flex-row px-[11px] py-[15px] bg-white border-grey-800 items-center";
    }
    return "flex-col px-[16px] py-[15px] bg-white border-grey-200 justify-center items-start";
  };

  const getTextClasses = () => {
    if (type === 1) return "text-grey-400 placeholder:text-grey-400";
    return "text-grey-800 placeholder:text-grey-400";
  };

  return (
    <div
      className={`flex w-[280px] gap-[10px] rounded-sm border border-solid transition-all box-border ${getContainerClasses()}`}
    >
      {type === 1 && (
        <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center text-grey-400">
          <div
            className="h-full w-full bg-current"
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
        </div>
      )}

      <input
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`flex-1 w-full bg-transparent p-0 outline-none text-body-1 ${getTextClasses()}`}
        {...props}
      />

      {type === 2 && hasText && (
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            if (onClear) onClear();
          }}
          className="flex h-[24px] w-[24px] shrink-0 items-center justify-center text-grey-300 transition-colors hover:text-grey-800"
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

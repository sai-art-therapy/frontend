import React from "react";

export type PopupButtonTheme =
  | "dark" // 배경: Grey800, 텍스트: White
  | "light" // 배경: Grey100, 텍스트: Grey600
  | "ember" // 배경: Ember500, 텍스트: White
  | "error" // 배경: Error100, 텍스트: Error500
  | "success"; // 배경: Success100, 텍스트: Success500

export interface PopupButtonProps {
  label: string;
  theme: PopupButtonTheme;
  onClick?: () => void;
}

export interface PopupProps {
  title: string;
  subtitle?: string;
  buttons: PopupButtonProps[];
}

export const Popup: React.FC<PopupProps> = ({ title, subtitle, buttons }) => {
  const getButtonThemeClasses = (theme: PopupButtonTheme) => {
    switch (theme) {
      case "dark":
        return "bg-grey-800 text-white";
      case "light":
        return "bg-grey-100 text-grey-600";
      case "ember":
        return "bg-ember-500 text-white";
      case "error":
        return "bg-error-100 text-error-500";
      case "success":
        return "bg-success-100 text-success-500";
      default:
        return "bg-grey-100 text-grey-600";
    }
  };

  return (
    <div className="flex w-[320px] flex-col items-center gap-[32px] rounded-[12px] bg-white px-[16px] pb-[16px] pt-[32px]">
      {/* 텍스트 영역 */}
      <div className="flex w-full flex-col self-stretch text-left">
        <h3 className="text-[20px] font-bold leading-[25px] tracking-[0.38px] text-grey-800">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-[8px] text-[15px] font-normal leading-[20px] tracking-[-0.24px] text-grey-600">
            {subtitle}
          </p>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="flex w-full gap-[8px]">
        {buttons.map((btn, index) => (
          <button
            key={index}
            type="button"
            onClick={btn.onClick}
            className={`flex h-[45px] flex-1 items-center justify-center gap-[6px] rounded-[8px] p-[12px] text-[16px] font-semibold leading-[21px] tracking-[-0.32px] transition-opacity hover:opacity-90 ${getButtonThemeClasses(
              btn.theme,
            )}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

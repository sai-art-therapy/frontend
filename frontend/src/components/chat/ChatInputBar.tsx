import React from "react";
import { TextField } from "../../components/common/Textfield";
import sendIcon from "../../assets/icons/chat/send.svg";

interface ChatInputBarProps {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  value,
  onChange,
  onSend,
}) => {
  const hasText = value.trim().length > 0;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[402px] bg-white p-[16px_16px_34px_16px] flex items-center gap-[16px] z-40 border-t border-grey-50">
      <TextField
        placeholder="메시지를 입력해주세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`flex-1 !w-auto text-body-1 font-sans ${
          hasText
            ? "!border-grey-800 !p-[14px_16px] !gap-[4px] text-black"
            : "!border-grey-200 !p-[15px_16px] !gap-[10px] text-grey-400"
        }`}
      />

      <button
        disabled={!hasText}
        onClick={onSend}
        className={`flex w-[52px] h-[52px] p-[8px_14px] justify-center items-center gap-[10px] shrink-0 rounded-[1575.758px] transition-colors ${
          hasText ? "bg-main-500" : "bg-grey-100"
        }`}
      >
        <img
          src={sendIcon}
          alt="보내기"
          className={`w-[32px] h-[32px] shrink-0 ${hasText ? "brightness-0 invert" : ""}`}
        />
      </button>
    </div>
  );
};

import React from "react";
import { ActionButton } from "../../components/common/ActionButton";

import chatSearchIcon from "../../assets/icons/home/chat-search.svg";
import boyIcon from "../../assets/icons/test/boy.png";
import chevronIcon from "../../assets/icons/common/chevron.svg";

interface ChatbotCardProps {
  hasHistory: boolean;
  title: string;
  description: string;
  recommendedQuestions: string[];
  buttonText: string;
  child: { child_id: number; name: string } | null;
  latestTest: { tested_at: string; test_number: number } | null;
}

function formatDaysAgo(dateStr: string): string {
  const diff = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "오늘";
  return `${diff}일 전`;
}

const ChatbotCard: React.FC<ChatbotCardProps> = ({
  hasHistory,
  title,
  description,
  recommendedQuestions,
  buttonText,
  child,
  latestTest,
}) => {
  return (
    <div className="flex w-[370px] p-side flex-col justify-center items-start rounded-md bg-white mb-side">
      <div className="flex items-center gap-[10px] mb-side w-full">
        <img
          src={chatSearchIcon}
          alt="챗봇"
          className="w-icon-lg h-icon-lg object-contain"
        />
        <div className="flex flex-col">
          <span
            className="text-sub-500 text-e-footnote"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            AI 챗봇 상담사
          </span>
          <h3
            className="text-black text-e-body-1 font-bold mt-[2px]"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            {title}
          </h3>
        </div>
      </div>

      {hasHistory && child && latestTest ? (
        <div className="flex w-[338px] p-[8px_12px] justify-between items-center rounded-sm bg-sub-100 mb-side">
          <div className="flex items-center gap-[8px]">
            <div className="flex w-[40px] h-[40px] justify-center items-center rounded-full bg-white overflow-hidden">
              <img
                src={boyIcon}
                alt="아이 정보"
                className="w-[22px] h-[22px] object-cover"
              />
            </div>
            <span className="text-black text-e-subheadline">{child.name}</span>
          </div>
          <div className="flex items-center text-black text-footnote">
            <span>{formatDaysAgo(latestTest.tested_at)}</span>
            <span className="mx-[2px]">・</span>
            <span>{latestTest.test_number} 검사</span>
          </div>
        </div>
      ) : (
        <p
          className="text-grey-700 text-subheadline mb-side whitespace-pre-line"
          style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
        >
          {description}
        </p>
      )}

      <div className="flex flex-col gap-[8px] w-full mb-side">
        {recommendedQuestions.map((question, idx) => (
          <div
            key={idx}
            className="flex w-[338px] p-[12px_16px] justify-between items-center rounded-sm bg-grey-50 cursor-pointer hover:bg-grey-100 transition-colors"
          >
            <span
              className="text-grey-700 text-left text-e-subheadline"
              style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
            >
              {question}
            </span>
            <img
              src={chevronIcon}
              alt="이동"
              className="w-icon-sm h-icon-sm shrink-0"
            />
          </div>
        ))}
      </div>

      <div className="w-full">
        <ActionButton
          variant="darkGrey"
          size="md"
          showIcon={false}
          className="w-full bg-grey-800 rounded-sm"
        >
          {buttonText}
        </ActionButton>
      </div>
    </div>
  );
};

export default ChatbotCard;

import React from "react";
import { ActionButton } from "../../components/common/ActionButton";

import chatSearchIcon from "../../assets/icons/home/chat-search.svg";
import boyIcon from "../../assets/icons/test/boy.png";
import chevronIcon from "../../assets/icons/common/chevron.svg";

interface ChatbotUserInfo {
  name: string;
  daysAgo: string;
  testCount: number;
}

interface ChatbotCardProps {
  hasHistory: boolean;
  userInfo: ChatbotUserInfo;
  testedQuestions: string[];
  defaultQuestions: string[];
}

const ChatbotCard: React.FC<ChatbotCardProps> = ({
  hasHistory,
  userInfo,
  testedQuestions,
  defaultQuestions,
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
            {hasHistory
              ? "최근 결과에 대해 더 알아볼까요?"
              : "육아 고민, AI에게 물어보세요"}
          </h3>
        </div>
      </div>

      {/* 분기 처리 - 이력 유무에 따른 상단 서브 가이드 분기 */}
      {hasHistory ? (
        /* 이력 있을 때 */
        <div className="flex w-[338px] p-[8px_12px] justify-between items-center rounded-sm bg-sub-100 mb-side">
          <div className="flex items-center gap-[8px]">
            <div className="flex w-[40px] h-[40px] justify-center items-center rounded-full bg-white overflow-hidden">
              <img
                src={boyIcon}
                alt="아이 정보"
                className="w-[22px] h-[22px] object-cover"
              />
            </div>
            <span className="text-black text-e-subheadline">
              {userInfo.name}
            </span>
          </div>
          <div className="flex items-center text-black text-footnote">
            <span>{userInfo.daysAgo}</span>
            <span className="mx-[2px]">・</span>
            <span>{userInfo.testCount} 검사</span>
          </div>
        </div>
      ) : (
        /* 이력 없을 때 */
        <p
          className="text-grey-700 text-subheadline mb-side whitespace-pre-line"
          style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
        >
          검사를 하지 않아도 괜찮아요.{"\n"}아이에 대한 궁금증을 편하게 이야기해
          보세요.
        </p>
      )}

      {/* 퀵 대화 질문 목록 */}
      <div className="flex flex-col gap-[8px] w-full mb-side">
        {(hasHistory ? testedQuestions : defaultQuestions).map(
          (question, idx) => (
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
          ),
        )}
      </div>

      {/* 바로가기 */}
      <div className="w-full">
        <ActionButton
          variant="darkGrey"
          size="md"
          showIcon={false}
          className="w-full bg-grey-800 rounded-sm"
        >
          AI 챗봇 바로가기
        </ActionButton>
      </div>
    </div>
  );
};

export default ChatbotCard;

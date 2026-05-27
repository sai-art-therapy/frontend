import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReportSummaryCard } from "../../components/chat/ReportSummaryCard";
import { ReportBottomSheet } from "../../components/chat/ReportBottomSheet";
import { ChatInputBar } from "../../components/chat/ChatInputBar";

import returnIcon from "../../assets/icons/common/return.svg";
import logoIcon from "../../assets/icons/common/logo.svg";
import searchIcon from "../../assets/icons/common/search.svg";
import thinkingIcon from "../../assets/icons/chat/thinking.svg";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

const ChatRoomPage = () => {
  const navigate = useNavigate();

  const [hasReport, setHasReport] = useState<boolean>(false);

  const [currentReport, setCurrentReport] = useState({
    name: "박카피",
    date: "5월 7일",
    count: 3,
  });
  const [inputValue, setInputValue] = useState("");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const mockReportList = [
    { name: "카피바라", date: "5월 7일", count: 3 },
    { name: "카카바라", date: "5월 7일", count: 2 },
    { name: "피피바라", date: "5월 7일", count: 1 },
  ];

  const reportQuestions = [
    "민준이 또래는 보통 어떤가요?",
    "이번 검사 결과를 쉽게 설명해 주세요",
    "함께할 활동을 추천해주세요",
    "지난 검사와 비교하면 어떤가요?",
  ];

  const generalQuestions = [
    "HTP 검사가 뭔가요?",
    "아이가 그림을 잘 안 그리려고 해요",
    "요즘 아이가 부쩍 짜증을 내요",
  ];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsAiThinking(true);
  };

  const handleSendMessage = () => {
    sendMessage(inputValue);
  };

  const handleStopThinking = () => {
    setIsAiThinking(false);
  };

  return (
    <div className="w-full bg-white font-sans relative min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[402px] bg-white min-h-screen flex flex-col relative shadow-sm">
        <div className="flex w-full items-center justify-between px-[24px] pb-[19px] pt-[21px]">
          <span className="text-subheadline font-semibold invisible" aria-hidden="true">
            9:41
          </span>
          <div className="flex items-center gap-[5px] invisible" aria-hidden="true">
            <div className="h-[10px] w-[17px] rounded-xs bg-black"></div>
            <div className="h-[11px] w-[15px] rounded-xs bg-black"></div>
            <div className="h-[11px] w-[24px] rounded-xs bg-black"></div>
          </div>
        </div>

        <div className="flex h-[68px] w-full items-center justify-start gap-[16px] px-side py-[20px]">
          <img
            src={returnIcon}
            alt="뒤로가기"
            onClick={() => navigate(-1)}
            className="h-[14px] w-[14px] cursor-pointer"
          />
          <h1 className="text-e-title-3 text-grey-900 font-sans">AI 챗봇</h1>
        </div>

        <main className="flex-1 flex flex-col items-center px-side pb-[140px] overflow-y-auto w-full">
          {hasReport && (
            <ReportSummaryCard
              name={currentReport.name}
              date={currentReport.date}
              count={currentReport.count}
              onChangeClick={() => setIsBottomSheetOpen(true)}
            />
          )}

          {messages.length === 0 && (
            <>
              <div className="mt-[40px] flex flex-col items-center">
                <img
                  src={logoIcon}
                  alt="AI 로고"
                  className="w-[96px] h-[96px] object-contain"
                />

                <h2 className="mt-[16px] text-center text-e-title-3 text-black font-sans whitespace-pre-line">
                  {hasReport
                    ? `${currentReport.name}의 \n${currentReport.date} 리포트를 함께 보고있어요.\n어떤 부분부터 이야기해볼까요?`
                    : `안녕하세요,\n육아 고민이나 궁금한 점을\n편하게 물어보세요`}
                </h2>
              </div>

              <div className="mt-[24px] flex flex-col w-full gap-[8px] items-center">
                {(hasReport ? reportQuestions : generalQuestions).map(
                  (question, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(question)}
                      className="flex cursor-pointer px-[16px] py-[8px] justify-center items-center gap-[10px] rounded-[1000px] bg-grey-100 hover:bg-grey-200/50 transition-colors"
                    >
                      <img
                        src={searchIcon}
                        alt="검색"
                        className="w-[24px] h-[24px] shrink-0"
                      />
                      <span className="text-subheadline text-grey-800 font-sans">
                        {question}
                      </span>
                    </button>
                  ),
                )}
              </div>
            </>
          )}

          {messages.length > 0 && (
            <div className="w-full mt-[24px] flex flex-col gap-[28px]">
              {messages.map((msg) => (
                <div key={msg.id} className="w-full flex justify-end">
                  <div
                    className="inline-flex p-[16px] justify-center items-center gap-[10px] bg-main-100 text-black text-subheadline font-[400]"
                    style={{ borderRadius: "1000px" }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isAiThinking && (
                <div className="w-full flex items-center mt-[28px]">
                  <img
                    src={logoIcon}
                    alt="AI 로고"
                    className="w-[48px] h-[48px] object-contain shrink-0"
                  />
                  <span
                    className="ml-[9px] text-grey-500 text-body-2 font-sans"
                    style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
                  >
                    생각하고 있어요
                  </span>
                </div>
              )}
            </div>
          )}
        </main>

        {isAiThinking ? (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[402px] bg-white p-[16px_16px_34px_16px] flex items-center gap-[12px] z-40">
            <div className="flex-1 bg-white border border-grey-200 rounded-[8px] p-[15px_16px] text-body-1 font-sans text-grey-400">
              {inputValue || "메시지를 입력해주세요"}
            </div>
            <button
              onClick={handleStopThinking}
              className="flex w-[52px] h-[52px] justify-center items-center shrink-0 rounded-full bg-[#FF6229] transition-colors"
            >
              <img
                src={thinkingIcon}
                alt="생각 중단"
                className="w-[32px] h-[32px] shrink-0"
              />
            </button>
          </div>
        ) : (
          <ChatInputBar
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
          />
        )}

        <ReportBottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          reports={mockReportList}
          onSelectReport={(report) => {
            setCurrentReport(report);
            setIsBottomSheetOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default ChatRoomPage;

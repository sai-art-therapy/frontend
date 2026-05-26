import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReportSummaryCard } from "../../components/chat/ReportSummaryCard";
import { ReportBottomSheet } from "../../components/chat/ReportBottomSheet";
import { ChatInputBar } from "../../components/chat/ChatInputBar";

import returnIcon from "../../assets/icons/common/return.svg";
import logoIcon from "../../assets/icons/common/logo.svg";
import searchIcon from "../../assets/icons/common/search.svg";

const ChatRoomPage = () => {
  const navigate = useNavigate();

  const [currentReport, setCurrentReport] = useState({
    name: "박카피",
    date: "5월 7일",
    count: 3,
  });
  const [inputValue, setInputValue] = useState("");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const mockReportList = [
    { name: "카피바라", date: "5월 7일", count: 3 },
    { name: "카카바라", date: "5월 7일", count: 2 },
    { name: "피피바라", date: "5월 7일", count: 1 },
  ];

  const quickQuestions = [
    "민준이 또래는 보통 어떤가요?",
    "이번 검사 결과를 쉽게 설명해 주세요",
    "함께할 활동을 추천해주세요",
    "지난 검사와 비교하면 어떤가요?",
  ];

  const handleSendMessage = () => {
    console.log("전송된 메시지:", inputValue);
    setInputValue("");
  };

  return (
    <div className="w-full bg-white font-sans relative min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[402px] bg-white min-h-screen flex flex-col relative shadow-sm">
        <div className="flex w-full items-center justify-between px-[24px] pb-[19px] pt-[21px]">
          <span className="text-subheadline font-semibold text-black">
            9:41
          </span>
          <div className="flex items-center gap-[5px]">
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

        <main className="flex-1 flex flex-col items-center px-side pb-[120px]">
          <ReportSummaryCard
            name={currentReport.name}
            date={currentReport.date}
            count={currentReport.count}
            onChangeClick={() => setIsBottomSheetOpen(true)}
          />

          <div className="mt-[40px] flex flex-col items-center">
            <img
              src={logoIcon}
              alt="AI 로고"
              className="w-[96px] h-[96px] object-contain"
            />
            <h2 className="mt-[16px] text-center text-e-title-3 text-black font-sans whitespace-pre-line">
              {currentReport.name}의 {"\n"}
              {currentReport.date} 리포트를 함께 보고있어요.{"\n"}어떤 부분부터
              이야기해볼까요?
            </h2>
          </div>

          <div className="mt-[24px] flex flex-col w-full gap-[8px] items-center">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputValue(question)}
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
            ))}
          </div>
        </main>

        <ChatInputBar
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
        />

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

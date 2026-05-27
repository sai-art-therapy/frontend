import React, { useState } from "react";
import DrawingTestCard from "../../components/home/DrawingTestCard";
import ChatbotCard from "../../components/home/ChatbotCard";
import RecentReportsCard from "../../components/home/RecentReportsCard";

interface UserInfoData {
  name: string;
  daysAgo: string;
  testCount: number;
  date: string;
}

const HomePage: React.FC = () => {
  const [hasHistory, setHasHistory] = useState<boolean>(false);

  const userInfo: UserInfoData = {
    name: "민준",
    daysAgo: "2일 전",
    testCount: 3,
    date: "5월 7일",
  };

  const testedQuestions: string[] = [
    "민준이의 자아상이 왜 약한 걸까요?",
    "자신감을 키워주려면 어떻게 해야 할까요?",
    "다음에는 어떤 활동을 함께해볼까요?",
  ];

  const defaultQuestions: string[] = [
    "HTP 검사가 뭔가요?",
    "아이가 그림을 잘 안 그리려고 해요",
    "요즘 아이가 부쩍 짜증을 내요",
  ];

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="no-scrollbar flex w-full min-h-screen flex-col items-center bg-grey-50 pb-[40px] font-sans overflow-y-auto select-none">
        <div className="flex w-full items-center justify-center gap-[154px] px-[24px] pb-[19px] pt-[21px] bg-grey-50">
          <span className="text-e-subheadline invisible" aria-hidden="true">9:41</span>
          <div className="flex items-center gap-[5px] invisible" aria-hidden="true">
            <div className="h-[10px] w-[17px] rounded-xs bg-black"></div>
            <div className="h-[11px] w-[15px] rounded-xs bg-black"></div>
            <div className="h-[11px] w-[24px] rounded-xs bg-black"></div>
          </div>
        </div>

        <div className="w-full max-w-[402px] flex flex-col items-center px-side mt-[13px]">
          <h1
            className="w-full text-left text-black text-e-title-3 font-bold mb-[24px]"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            우리 아이, 요즘 어떤 마음일까요?
          </h1>

          <DrawingTestCard hasHistory={hasHistory} />

          <ChatbotCard
            hasHistory={hasHistory}
            userInfo={userInfo}
            testedQuestions={testedQuestions}
            defaultQuestions={defaultQuestions}
          />

          {hasHistory && <RecentReportsCard userInfo={userInfo} />}
        </div>
      </div>
    </>
  );
};

export default HomePage;

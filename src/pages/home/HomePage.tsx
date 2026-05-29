import React, { useEffect, useState } from "react";
import DrawingTestCard from "../../components/home/DrawingTestCard";
import ChatbotCard from "../../components/home/ChatbotCard";
import RecentReportsCard from "../../components/home/RecentReportsCard";
import { getHome } from "../../api/home";
import type { HomeResponse } from "../../api/home";

const HomePage: React.FC = () => {
  const [data, setData] = useState<HomeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHome()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        setError("홈 데이터를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return null;

  const hasHistory = data.recent_reports_card.reports.length > 0;

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="no-scrollbar flex w-full min-h-screen flex-col items-center bg-grey-50 pb-[40px] font-sans overflow-y-auto select-none">
        

        <div className="w-full max-w-[402px] flex flex-col items-center px-side ">
          <h1
            className="w-full text-left text-black text-e-title-3 font-bold mb-[16px] mt-[16px]"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            {data.headline}
          </h1>

          <DrawingTestCard
            hasHistory={hasHistory}
            title={data.test_card.title}
            subtitle={data.test_card.subtitle}
            buttonText={data.test_card.button_text}
          />

          <ChatbotCard
            hasHistory={hasHistory}
            title={data.chatbot_card.title}
            description={data.chatbot_card.description}
            recommendedQuestions={data.chatbot_card.recommended_questions}
            buttonText={data.chatbot_card.button_text}
            child={data.chatbot_card.child}
            latestTest={data.chatbot_card.latest_test}
          />

          {hasHistory && (
            <RecentReportsCard
              title={data.recent_reports_card.title}
              reports={data.recent_reports_card.reports}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;

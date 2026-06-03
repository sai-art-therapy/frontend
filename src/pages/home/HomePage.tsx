import React, { useEffect, useState, useRef } from "react";
import DrawingTestCard from "../../components/home/DrawingTestCard";
import ChatbotCard from "../../components/home/ChatbotCard";
import RecentReportsCard from "../../components/home/RecentReportsCard";
import { getHome } from "../../api/home";
import type { HomeResponse } from "../../api/home";

const HomePage: React.FC = () => {
  const [data, setData] = useState<HomeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 딱 한 번만 호출되도록 보장하는 락
  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    getHome()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("홈 데이터 호출 실패:", err);
        setError("홈 데이터를 불러오지 못했습니다. 서버 주소를 확인해 주세요.");
        setLoading(false);
      });
  }, []);

  // 에러나 로딩 시 전체 DOM 레이아웃 구조를 유지하여 부모 컴포넌트의 리마운트(무한루프) 방지
  if (loading || error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-grey-50">
        <p className="text-grey-500 font-bold">
          {loading ? "로딩 중..." : error}
        </p>
      </div>
    );
  }

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

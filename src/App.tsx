import { useState } from "react";
import {
  BottomNavigation,
  type NavTabId,
} from "./components/common/BottomNavigation";
import { TopBar } from "./components/common/TopBar";

function App() {
  const [activeTab, setActiveTab] = useState<NavTabId>("home");

  const handleTabChange = (tabId: NavTabId) => {
    setActiveTab(tabId);
    console.log(`${tabId} 탭으로 이동`);
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-[402px] bg-white shadow-xl flex flex-col relative overflow-hidden rounded-lg">
        <TopBar title="GDAM" variant="search" />

        <main className="flex-1 p-6 flex items-center justify-center flex-col gap-4 text-grey-600">
          {activeTab === "home" && (
            <h2 className="text-e-title-1 text-main-500">홈 화면</h2>
          )}
          {activeTab === "test" && (
            <h2 className="text-e-title-1 text-success-500">심리 검사 목록</h2>
          )}
          {activeTab === "mypage" && (
            <h2 className="text-e-title-1 text-sub-500">마이페이지</h2>
          )}
          <p className="text-body-2">
            현재 선택된 탭:{" "}
            <span className="font-bold text-grey-900">{activeTab}</span>
          </p>
        </main>

        <div className="sticky bottom-0">
          <BottomNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import homeIcon from "../../assets/icons/common/home.svg?url";
import testIcon from "../../assets/icons/common/test.svg?url";
import mypageIcon from "../../assets/icons/common/mypage.svg?url";

export type NavTabId = "home" | "test" | "mypage";

interface NavItem {
  id: NavTabId;
  label: string;
  iconUrl: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "홈", iconUrl: homeIcon },
  { id: "test", label: "심리 검사", iconUrl: testIcon },
  { id: "mypage", label: "마이페이지", iconUrl: mypageIcon },
];

interface BottomNavigationProps {
  activeTab: NavTabId;
  onTabChange: (tabId: NavTabId) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <nav className="flex w-full flex-col items-center justify-center gap-[10px] bg-white pt-0 px-[0px] pb-[24px] shadow-[0_-2px_10px_0_rgba(0,0,0,0.05)]">
      <div className="flex w-full justify-around items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex w-[70px] h-[75px] flex-col items-center justify-center gap-[8px] pt-[12.5px] px-[15px] pb-[12.5px]"
            >
              <div
                className={`w-[28px] h-[28px] shrink-0 transition-colors ${
                  isActive ? "bg-main-500" : "bg-grey-400"
                }`}
                style={{
                  maskImage: `url("${item.iconUrl}")`,
                  WebkitMaskImage: `url("${item.iconUrl}")`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                }}
              />

              <span
                className={`transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-e-footnote text-main-500"
                    : "text-footnote text-grey-400 font-normal"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

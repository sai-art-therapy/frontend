import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  type NavTabId,
} from "../components/common/BottomNavigation";

export default function NavigationLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const activeTab = pathname.includes("test")
    ? "test"
    : pathname.includes("mypage")
      ? "mypage"
      : "home";

  return (
    <>
      <div className="pb-[80px]">
        <Outlet />
      </div>
      <div className="fixed bottom-0 w-full max-w-[402px]">
        <BottomNavigation
          activeTab={activeTab as NavTabId}
          onTabChange={(id) => navigate(`/${id}`)}
        />
      </div>
    </>
  );
}

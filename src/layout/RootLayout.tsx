import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="relative mx-auto w-full max-w-[402px] min-h-screen bg-white shadow-lg font-pretendard">
        <Outlet />
      </div>
    </div>
  );
}

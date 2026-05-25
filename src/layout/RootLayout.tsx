import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="bg-gray-100 h-screen overflow-hidden flex items-start justify-center">
      <div className="relative w-full max-w-[402px] h-screen overflow-y-auto bg-white shadow-lg font-pretendard">
        <Outlet />
      </div>
    </div>
  );
}

import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import NavigationLayout from "../layout/NavigationLayout";

import HomePage from "../pages/test/test";
// 💡 추가된 부분 1: TestStart 페이지 컴포넌트를 불러옵니다.
// (경로가 src/pages/TestStart.tsx에 있다면 아래 경로가 맞습니다)
import TestStart from "../pages/test/TestStart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/test" replace />,
      },
      // 💡 추가된 부분 2: 하단 탭바(NavigationLayout)가 없는 독립된 페이지로 등록합니다.
      {
        path: "/test-start",
        element: <TestStart />,
      },
      {
        element: <NavigationLayout />,
        children: [
          {
            path: "/home",
            element: <div>홈 페이지 (준비중)</div>,
          },
          {
            path: "/test",
            element: <HomePage />,
          },
          {
            path: "/mypage",
            element: <div>마이페이지 (준비중)</div>,
          },
        ],
      },
    ],
  },
]);

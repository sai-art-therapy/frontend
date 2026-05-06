import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import NavigationLayout from "../layout/NavigationLayout";

import HomePage from "../pages/test";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/test" replace />,
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

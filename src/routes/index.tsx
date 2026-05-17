import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import NavigationLayout from "../layout/NavigationLayout";

import HomePage from "../pages/test/test";
import TestStart from "../pages/test/TestStart";
import TestFirstStep from "../pages/test/TestFirstStep";
import TestSecondStep from "../pages/test/TestSecondStep";
import TestThirdStep from "../pages/test/TestThirdStep";
import TestLoadingStep from "../pages/test/TestLoadingStep";
import TestResult from "../pages/test/TestResult";

import MyPage from "../pages/MyPage/MyPage";
import ProfileEditPage from "../pages/MyPage/ProfileEditPage";
import ChildEditPage from "../pages/MyPage/ChildEditPage";
import AddChildPage from "../pages/MyPage/AddChildPage";
import PreparationPage from "../pages/MyPage/PreparationPage";

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
        path: "/test-start",
        element: <TestStart />,
      },
      {
        path: "/test-first-step",
        element: <TestFirstStep />,
      },
      {
        path: "/test-second-step",
        element: <TestSecondStep />,
      },
      {
        path: "/test-third-step",
        element: <TestThirdStep />,
      },
      {
        path: "/test-loading-step",
        element: <TestLoadingStep />,
      },
      {
        path: "/test-result",
        element: <TestResult />,
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
            element: <MyPage />,
          },
          {
            path: "/profile/edit",
            element: <ProfileEditPage />,
          },
          {
            path: "/child/edit",
            element: <ChildEditPage />,
          },
          {
            path: "/child/add",
            element: <AddChildPage />,
          },
          {
            path: "/guide",
            element: (
              <PreparationPage
                title="사용 가이드"
                message="사용 가이드를 추가하는 중이에요!"
              />
            ),
          },
          {
            path: "/faq",
            element: (
              <PreparationPage
                title="자주 묻는 질문"
                message="자주 묻는 질문을 추가하는 중이에요!"
              />
            ),
          },
          {
            path: "/terms",
            element: (
              <PreparationPage
                title="약관 및 정책"
                message="약관 및 정책을 추가하는 중이에요!"
              />
            ),
          },
        ],
      },
    ],
  },
]);

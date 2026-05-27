import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import NavigationLayout from "../layout/NavigationLayout";

import LoginPage from "../pages/auth/LoginPage";
import AuthCallbackPage from "../pages/auth/AuthCallbackPage";
import SignupTermsPage from "../pages/auth/SignupTermsPage";
import SignupProfilePage from "../pages/auth/SignupProfilePage";
import SignupChildPage from "../pages/auth/SignupChildPage";
import TestHomePage from "../pages/test/test";
import TestStart from "../pages/test/TestStart";
import TestFirstStep from "../pages/test/TestFirstStep";
import TestSecondStep from "../pages/test/TestSecondStep";
import TestThirdStep from "../pages/test/TestThirdStep";
import TestLoadingStep from "../pages/test/TestLoadingStep";
import TestTimeInputStep from "../pages/test/TestTimeInputStep";
import TestResult from "../pages/test/TestResult";
import TestQuestionIntroStep from "../pages/test/TestQuestionIntroStep";
import TestQuestionFormStep from "../pages/test/TestQuestionFormStep";
import ChatIntroStep from "../pages/chat/ChatIntroStep";
import ChatRoomPage from "../pages/chat/ChatRoomPage";

import MyPage from "../pages/MyPage/MyPage";
import ProfileEditPage from "../pages/MyPage/ProfileEditPage";
import ChildEditPage from "../pages/MyPage/ChildEditPage";
import AddChildPage from "../pages/MyPage/AddChildPage";
import PreparationPage from "../pages/MyPage/PreparationPage";

import HomePage from "../pages/home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/callback",
        element: <AuthCallbackPage />,
      },
      {
        path: "/signup/terms",
        element: <SignupTermsPage />,
      },
      {
        path: "/signup/profile",
        element: <SignupProfilePage />,
      },
      {
        path: "/signup/child",
        element: <SignupChildPage />,
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
        path: "/test-time-input-step",
        element: <TestTimeInputStep />,
      },
      {
        path: "/test-question-intro-step",
        element: <TestQuestionIntroStep />,
      },
      {
        path: "/test-question-form-step",
        element: <TestQuestionFormStep />,
      },
      {
        path: "/test-result",
        element: <TestResult />,
      },
      {
        path: "/chat/intro-step",
        element: <ChatIntroStep />,
      },
      {
        path: "/chat/report/:reportId",
        element: <ChatRoomPage />,
      },
      {
        element: <NavigationLayout />,
        children: [
          {
            path: "/home",
            element: <HomePage />,
          },
          {
            path: "/test",
            element: <TestHomePage />,
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

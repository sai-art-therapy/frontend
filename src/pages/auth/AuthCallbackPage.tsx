import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  // StrictMode로 인해 useEffect가 두 번 실행되어 타이밍이 꼬이는 것을 방지
  const isProcessing = useRef(false);

  useEffect(() => {
    // 중복 실행 방지 가드 lock
    if (isProcessing.current) return;
    isProcessing.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token") ?? params.get("access_token");
    const onboardingCompleted = params.get("onboarding_completed");
    const nextStep = params.get("next_step");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // 동기적인 토큰 세팅 프로세스 진행
    try {
      // 전역 상태 및 동기적 스토리지 저장 보장
      setToken(token);

      // 토큰 저장이 확실히 끝난 시점에 안전하게 페이지 전환
      if (onboardingCompleted === "true" || nextStep === "done") {
        navigate("/home", { replace: true });
      } else {
        navigate("/signup/terms", { replace: true });
      }
    } catch (error) {
      console.error("인증 처리 중 오류 발생:", error);
      navigate("/login", { replace: true });
    }
  }, [navigate, setToken]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-grey-500 animate-pulse">
          안전하게 로그인 중입니다...
        </p>
      </div>
    </div>
  );
}

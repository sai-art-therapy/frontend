import gdamOnboarding from "../../assets/icons/auth/gdam-onboarding.png";
import googleLogo from "../../assets/icons/auth/google-logo.svg";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      {/* 상단 타이틀 (절대 위치) */}
      <div className="absolute left-[32px] top-[96px] flex w-[291px] flex-col gap-[8px]">
        <p className="text-[28px] font-bold leading-[41px] tracking-[0.37px] text-black whitespace-pre-wrap">
          {`AI가 분석하는 \n우리 아이만의 심리 리포트`}
        </p>
        <p className="font-['Albert_Sans'] text-[50px] font-bold leading-normal text-black">
          GDAM
        </p>
      </div>

      {/* 온보딩 이미지 + 버튼 (중앙 하단) */}
      <div className="absolute left-1/2 top-[calc(58.33%+28px)] flex w-[370px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[40px]">
        <img
          src={gdamOnboarding}
          alt="GDAM 온보딩"
          className="h-[336px] w-[370px] object-cover"
        />

        <button
          onClick={handleGoogleLogin}
          className="flex h-[52px] w-full items-center overflow-hidden rounded-[10px] bg-grey-50 px-[56px] transition-colors active:bg-grey-100"
        >
          <div className="flex size-[48px] shrink-0 items-center justify-center">
            <img src={googleLogo} alt="Google" className="size-[26px]" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <span className="text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-grey-900 whitespace-nowrap">
              Google로 로그인
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

import gdamLogo from "../../assets/icons/auth/gdam-logo.svg";
import gdamText from "../../assets/icons/auth/GDAM.svg";
import googleLogo from "../../assets/icons/auth/google-logo.svg";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-[16px]">
      <div className="flex w-full max-w-[370px] flex-col items-center gap-[80px]">
        {/* Logo + Text */}
        <div className="flex flex-col items-center gap-[16px] w-full">
          <div className="flex flex-col items-center gap-2">
            <img
              src={gdamLogo}
              alt="GDAM 로고"
              className="size-[200px]"
            />
            <img src={gdamText} alt="GDAM" />
          </div>

          <div className="flex flex-col items-center gap-[8px] text-center w-full">
            <p className="text-[28px] font-bold leading-[34px] tracking-[0.37px] text-black">
              그림으로 만나는
              <br />
              우리 아이 마음
            </p>
            <p className="text-[17px] font-normal leading-[22px] tracking-[-0.41px] text-grey-700">
              집, 나무, 사람 한 장으로
              <br />
              AI가 분석하는 우리 아이만의 심리 리포트
            </p>
          </div>
        </div>

        {/* Google Login Button */}
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

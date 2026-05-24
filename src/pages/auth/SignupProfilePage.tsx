import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";
import apiClient from "../../api/client";

const NICKNAME_REGEX = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]{2,10}$/;

type NicknameState = "idle" | "error" | "success";

export default function SignupProfilePage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  const nicknameState: NicknameState =
    nickname === ""
      ? "idle"
      : NICKNAME_REGEX.test(nickname)
        ? "success"
        : "error";

  const canProceed = nicknameState === "success";

  const inputClass =
    nicknameState === "error"
      ? "border-error-500 bg-error-100 text-error-500"
      : "border-grey-200 bg-white text-black";

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white pb-[100px]">
      {/* 콘텐츠 */}
      <div className="flex flex-col gap-[64px] px-4 pt-[40px]">

        {/* 단계 표시 + 헤딩 */}
        <div className="flex flex-col gap-[52px]">
          {/* 진행 인디케이터 (Step 2: 1·2번 활성) */}
          <div className="flex items-center gap-4">
            <div className="h-1 flex-1 rounded-full bg-main-500" />
            <div className="h-1 flex-1 rounded-full bg-main-500" />
            <div className="h-0.5 flex-1 rounded-full bg-grey-200" />
          </div>

          {/* 제목 */}
          <div className="flex flex-col gap-2">
            <p className="text-[28px] font-bold leading-[41px] tracking-[0.37px] text-black">
              사용할 닉네임을 입력해주세요
            </p>
            <p className="text-[17px] font-normal leading-[22px] tracking-[-0.41px] text-grey-600">
              2~10자 한글/영문/숫자 가능합니다
            </p>
          </div>
        </div>

        {/* 입력 폼 */}
        <div className="flex flex-col gap-6 w-full">

          {/* 양육자 선택 */}
          

          {/* 닉네임 입력 */}
          <div className="flex flex-col gap-4">
            <p className="text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-black">
              닉네임
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해주세요"
                className={`w-full rounded-sm border px-4 py-[15px] text-[17px] font-normal leading-[22px] tracking-[-0.41px] outline-none placeholder:text-grey-400 transition-colors ${inputClass}`}
              />

              {/* 유효성 메시지 */}
              {nicknameState === "error" && (
                <div className="flex items-center gap-1 text-[13px] leading-[18px] tracking-[-0.08px] text-error-500">
                  <span>⊗</span>
                  <span>2~10자 한글/영문/숫자 가능합니다</span>
                </div>
              )}
              {nicknameState === "success" && (
                <div className="flex items-center gap-1 text-[13px] leading-[18px] tracking-[-0.08px] text-success-500">
                  <span>✓</span>
                  <span>사용 가능한 닉네임입니다</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="absolute bottom-[34px] left-4 right-4">
        <ActionButton
          variant="orange"
          size="xl"
          showIcon={false}
          disabled={!canProceed}
          onClick={async () => {
            try {
              await apiClient.patch('/auth/onboarding/nickname', { nickname })
              navigate("/signup/child")
            } catch (error: any) {
              console.log('닉네임 저장 실패:', error.response?.status, error.response?.data)
            }
          }}
          className="w-full"
        >
          다음
        </ActionButton>
      </div>
    </div>
  );
}

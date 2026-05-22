import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";

const TERMS = [
  { id: "age" as const, label: "만 14세 이상입니다" },
  { id: "service" as const, label: "서비스 이용약관" },
  { id: "privacy" as const, label: "개인정보 수집 및 이용" },
];

type TermId = (typeof TERMS)[number]["id"];

function CheckCircleIcon({ checked }: { checked: boolean }) {
  const color = checked ? "#ff6229" : "#c3cbd5";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="12" fill={color} />
      <path
        d="M7 12.5L10.5 16L17 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SignupTermsPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<Record<TermId, boolean>>({
    age: false,
    service: false,
    privacy: false,
  });

  const allChecked = TERMS.every((t) => checked[t.id]);

  const toggleAll = () => {
    const next = !allChecked;
    setChecked({ age: next, service: next, privacy: next });
  };

  const toggleOne = (id: TermId) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white pb-[100px]">
      {/* 콘텐츠 */}
      <div className="flex flex-col gap-12 px-4 pt-[40px]">

        {/* 단계 표시 + 헤딩 */}
        <div className="flex flex-col gap-[52px]">
          {/* 3단계 진행 인디케이터 */}
          <div className="flex items-center gap-4">
            <div className="h-[4px] flex-1 rounded-full bg-main-500" />
            <div className="h-[2px] flex-1 rounded-full bg-grey-200" />
            <div className="h-[2px] flex-1 rounded-full bg-grey-200" />
          </div>

          {/* 제목 */}
          <div className="flex flex-col gap-2">
            <p className="text-[28px] font-bold leading-[41px] tracking-[0.37px] text-black">
              서비스 이용에 동의해주세요
            </p>
            <p className="text-[17px] font-normal leading-[22px] tracking-[-0.41px] text-grey-600">
              아이의 정보를 안전하게 다루기 위해
              <br />
              동의가 필요해요
            </p>
          </div>
        </div>

        {/* 약관 목록 */}
        <div className="flex flex-col">
          {/* 전체 동의 + 구분선 */}
          <div className="flex flex-col gap-4">
            <button
              onClick={toggleAll}
              className={`flex w-full items-center gap-[10px] overflow-hidden rounded-md p-4 transition-colors ${
                allChecked ? "bg-main-100" : "bg-grey-50"
              }`}
            >
              <CheckCircleIcon checked={allChecked} />
              <span className="text-[17px] font-normal leading-[22px] tracking-[-0.41px] text-black">
                전체 동의
              </span>
            </button>
            <div className="h-px w-full bg-grey-200" />
          </div>

          {/* 개별 항목 */}
          <div className="flex flex-col gap-2">
            {TERMS.map((term) => (
              <button
                key={term.id}
                onClick={() => toggleOne(term.id)}
                className="flex w-full items-center gap-[10px] overflow-hidden rounded-md p-4 transition-colors active:bg-grey-50"
              >
                <CheckCircleIcon checked={checked[term.id]} />
                <div className="flex gap-1 text-[17px] font-normal leading-[22px] tracking-[-0.41px] text-black">
                  <span>[필수]</span>
                  <span>{term.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="absolute bottom-[34px] left-4 right-4">
        <ActionButton
          variant="orange"
          size="xl"
          showIcon={false}
          disabled={!allChecked}
          onClick={() => navigate("/signup/profile")}
          className="w-full"
        >
          다음
        </ActionButton>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";
import apiClient from "../../api/client";
import { Dropdown } from "../../components/common/Dropdown";
import femaleIcon from "../../assets/icons/Mypage/female_regular.svg?url";
import maleIcon from "../../assets/icons/Mypage/male_regular.svg?url";

type Gender = "여아" | "남아";

const BIRTH_YEARS = Array.from({ length: 25 }, (_, i) => 2024 - i); // 2024 ~ 2000

function GenderButton({
  label,
  icon,
  selected,
  selectedStyle,
  onClick,
}: {
  label: string;
  icon: string;
  selected: boolean;
  selectedStyle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-[10px] overflow-hidden rounded-sm px-6 py-[14px] transition-colors ${
        selected ? selectedStyle : "bg-grey-50"
      }`}
    >
      <div
        className={`size-6 shrink-0 ${selected ? "bg-current" : "bg-grey-500"}`}
        style={{
          maskImage: `url("${icon}")`,
          WebkitMaskImage: `url("${icon}")`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
      <span
        className={`text-[17px] font-normal leading-[22px] tracking-[-0.41px] ${
          selected ? "font-semibold" : "text-grey-500"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export default function SignupChildPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState<number | null>(null);
  const [gender, setGender] = useState<Gender | null>(null);

  const [yearOpen, setYearOpen] = useState(false);

  const canProceed = name.trim() !== "" && birthYear !== null && gender !== null;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white pb-[100px]">
      <div className="flex flex-col gap-12 px-4 pt-[40px]">

        {/* 진행 인디케이터 (Step 3: 전체 활성) */}
        <div className="flex flex-col gap-[52px]">
          <div className="flex items-center gap-4">
            <div className="h-1 flex-1 rounded-full bg-main-500" />
            <div className="h-1 flex-1 rounded-full bg-main-500" />
            <div className="h-1 flex-1 rounded-full bg-main-500" />
          </div>

          {/* 제목 */}
          <div className="flex flex-col gap-2">
            <p className="text-[28px] font-bold leading-[41px] tracking-[0.37px] text-black">
              아이를 소개해주세요
            </p>
            <p className="text-[17px] font-normal leading-[22px] tracking-[-0.41px] text-grey-600">
              검사를 받을 아이의 정보예요
              <br />
              나중에 마이페이지에서 수정할 수 있어요
            </p>
          </div>
        </div>

        {/* 입력 폼 */}
        <div className="flex flex-col gap-6 w-full">

          {/* 이름 */}
          <div className="flex flex-col gap-4">
            <p className="text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-black">
              이름
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해주세요"
              className="w-full rounded-sm border border-grey-200 bg-white px-4 py-[15px] text-[17px] font-normal leading-[22px] tracking-[-0.41px] text-grey-900 outline-none placeholder:text-grey-400"
            />
          </div>

          {/* 나이 (출생 연도 드롭다운) */}
          <div className="flex flex-col gap-4">
            <p className="text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-black">
              나이
            </p>
            <div className="relative w-full [&>button]:w-full">
              <Dropdown
                placeholder="출생 연도"
                value={birthYear ? `${birthYear}년생` : undefined}
                isOpen={yearOpen}
                onClick={() => setYearOpen((o) => !o)}
              />
              {yearOpen && (
                <>
                  {/* 바깥 클릭 시 닫힘 */}
                  <div
                    className="fixed inset-0 z-[9]"
                    onClick={() => setYearOpen(false)}
                  />
                  <ul className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-y-auto rounded-sm border border-grey-200 bg-white shadow-lg">
                    {BIRTH_YEARS.map((year) => (
                      <li key={year}>
                        <button
                          className={`w-full px-4 py-3 text-left text-[17px] leading-[22px] tracking-[-0.41px] transition-colors hover:bg-grey-50 ${
                            birthYear === year
                              ? "font-semibold text-main-500"
                              : "text-grey-900"
                          }`}
                          onClick={() => {
                            setBirthYear(year);
                            setYearOpen(false);
                          }}
                        >
                          {year}년생
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* 성별 */}
          <div className="flex flex-col gap-4">
            <p className="text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-black">
              성별
            </p>
            <div className="flex gap-6">
              <GenderButton
                label="여아"
                icon={femaleIcon}
                selected={gender === "여아"}
                selectedStyle="bg-error-100 text-error-500"
                onClick={() => setGender("여아")}
              />
              <GenderButton
                label="남아"
                icon={maleIcon}
                selected={gender === "남아"}
                selectedStyle="bg-sub-100 text-sub-500"
                onClick={() => setGender("남아")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 시작하기 버튼 */}
      <div className="absolute bottom-[34px] left-4 right-4">
        <ActionButton
          variant="orange"
          size="xl"
          showIcon={false}
          disabled={!canProceed}
          onClick={async () => {
            await apiClient.post('/children', {
              name,
              birth_year: birthYear,
              gender,
            })
            navigate("/home")
          }}
          className="w-full"
        >
          시작하기
        </ActionButton>
      </div>
    </div>
  );
}

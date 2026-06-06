import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";

import returnIcon from "../../assets/icons/common/return.svg";
import documentIcon from "../../assets/icons/test/document.svg";
import referIcon from "../../assets/icons/test/refer.svg";

import { useAppQuery } from "../../hooks/apiHooks";
import { getChildren } from "../../api/mypage";

const TestFirstStep = () => {
  const navigate = useNavigate();
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

  const { data: children, isLoading } = useAppQuery(["children"], getChildren);

  const calculateAge = (birthYear: number) => {
    const currentYear = 2026;
    const age = currentYear - birthYear;
    return age >= 0 ? age : 0;
  };

  return (
    <div className="flex w-full flex-col bg-white font-sans min-h-screen">
      <div className="flex h-[68px] w-full items-center justify-start gap-[16px] px-side py-[20px]">
        <img
          src={returnIcon}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
          className="h-[14px] w-[14px] cursor-pointer"
        />
        <h1 className="text-e-title-3 text-grey-900">미술 심리 검사</h1>
      </div>

      <main className="flex flex-col px-side pb-[120px]">
        <div className="mt-[10px] flex w-full items-center gap-[16px]">
          <div className="h-[5px] flex-1 rounded-full bg-main-500"></div>
          <div className="h-[5px] flex-1 rounded-full bg-grey-200"></div>
          <div className="h-[5px] flex-1 rounded-full bg-grey-200"></div>
        </div>

        <img
          src={documentIcon}
          alt="문서"
          className="mt-[35px] h-[48px] w-[48px]"
        />

        <div className="mt-[8px] flex flex-col">
          <h2 className="text-e-title-1 text-grey-900">
            누구의 마음을 들여다볼까요?
          </h2>
          <p className="mt-[4px] text-body-1 text-grey-600">
            검사할 아이를 선택해주세요
          </p>
        </div>

        {/* 자녀 리스트 카드 영역 */}
        <div className="mt-[46px] flex w-full flex-col gap-[24px]">
          {isLoading ? (
            <div className="text-center text-footnote text-grey-400 py-[20px]">
              자녀 목록을 불러오는 중입니다...
            </div>
          ) : children && children.length > 0 ? (
            children.map((child) => {
              const isSelected = selectedChildId === child.child_id;

              return (
                <div
                  key={child.child_id}
                  onClick={() => setSelectedChildId(child.child_id)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-md border p-[12px_16px] transition-colors duration-200 ${
                    isSelected
                      ? "border-main-500 bg-white"
                      : "border border-grey-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-[10px]">
                    <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-grey-50">
                      <span className="text-[32px]">
                        {child.gender === "male" ? "👦🏻" : "🧒🏻"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-e-body-1 text-black">
                        {child.name}
                      </span>
                      <span className="text-subheadline text-grey-700">
                        만 {calculateAge(child.birth_year)}세 ・{" "}
                        {child.gender === "male" ? "남아" : "여아"}
                      </span>
                    </div>
                  </div>

                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 transition-colors duration-200"
                  >
                    <circle
                      cx="9.5"
                      cy="9.5"
                      r="8.5"
                      fill={
                        isSelected ? "var(--color-main-500, #FBBF24)" : "none"
                      }
                      stroke={
                        isSelected
                          ? "var(--color-main-500, #FBBF24)"
                          : "var(--color-grey-200, #E5E7EB)"
                      }
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 9.5L8.5 12L13 7"
                      stroke={
                        isSelected
                          ? "var(--color-white, #FFFFFF)"
                          : "var(--color-grey-200, #E5E7EB)"
                      }
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              );
            })
          ) : (
            <div className="text-center text-footnote text-grey-500 py-[4px] rounded-sm border border-dashed border-grey-300 p-[20px]">
              등록된 자녀가 없습니다. 마이페이지에서 자녀를 먼저 등록해 주세요.
            </div>
          )}
        </div>

        <div className="mt-[24px] mb-[32px] flex w-full items-center gap-[10px] rounded-sm bg-warning-100 p-[12px]">
          <img
            src={referIcon}
            alt="참고"
            className="h-spacing-icon-sm w-spacing-icon-sm shrink-0"
          />
          <p className="text-footnote text-grey-900">
            아이 정보는 분석과 리포트에만 활용되며, 안전하게 보관돼요.
          </p>
        </div>
      </main>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[402px] -translate-x-1/2 bg-white px-side pb-[32px] pt-[16px]">
        <ActionButton
          variant="darkGrey"
          disabled={selectedChildId === null}
          className="w-full"
          showIcon={false}
          onClick={() => {
            navigate("/test-second-step", {
              state: { childId: selectedChildId },
            });
          }}
        >
          다음
        </ActionButton>
      </div>
    </div>
  );
};

export default TestFirstStep;

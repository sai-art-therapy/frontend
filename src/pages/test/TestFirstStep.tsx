import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";

import returnIcon from "../../assets/icons/common/return.svg";
import documentIcon from "../../assets/icons/test/document.svg";
import boyImg from "../../assets/icons/test/boy.png";
import referIcon from "../../assets/icons/test/refer.svg";

interface ChildData {
  id: number;
  name: string;
  age: number;
  gender: string;
  testCount: number;
}

const mockChildren: ChildData[] = [
  { id: 1, name: "이름", age: 0, gender: "성별", testCount: 0 },
  { id: 2, name: "이름", age: 0, gender: "성별", testCount: 0 },
];

const TestFirstStep = () => {
  const navigate = useNavigate();
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

  return (
    <div className="flex w-full flex-col bg-white font-sans pb-[100px]">
      {/* 상단 상태바 */}
      <div className="flex w-full items-center justify-between px-[24px] pb-[19px] pt-[21px]">
        <span className="text-[15px] font-semibold text-black tracking-[-0.24px]">
          9:41
        </span>
        <div className="flex items-center gap-[5px]">
          <div className="h-[10px] w-[17px] rounded-sm bg-black"></div>
          <div className="h-[11px] w-[15px] rounded-sm bg-black"></div>
          <div className="h-[11px] w-[24px] rounded-sm bg-black"></div>
        </div>
      </div>

      {/*헤더 영역 */}
      <div className="flex h-[68px] w-full items-center justify-start gap-[16px] px-[16px] py-[20px]">
        <img
          src={returnIcon}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
          className="h-[14px] w-[14px] cursor-pointer"
        />
        <h1 className="text-[18px] font-bold text-[#202939]">미술 심리 검사</h1>
      </div>

      <main className="flex flex-col px-[16px]">
        <div className="mt-[10px] flex w-full max-w-[370px] items-center gap-[16px]">
          <div className="h-[5px] flex-1 rounded-full bg-[#FF6229]"></div>
          <div className="h-[5px] flex-1 rounded-full bg-[#DDE1E9]"></div>
          <div className="h-[5px] flex-1 rounded-full bg-[#DDE1E9]"></div>
        </div>

        <img
          src={documentIcon}
          alt="문서"
          className="mt-[35px] h-[48px] w-[48px]"
        />

        <div className="mt-[8px] flex flex-col">
          <h2 className="text-[24px] font-bold leading-[34px] tracking-[0.36px] text-[#202939]">
            누구의 마음을 들여다볼까요?
          </h2>
          <p className="mt-[4px] text-[17px] font-normal leading-[22px] tracking-[-0.41px] text-[#697586]">
            검사할 아이를 선택해주세요
          </p>
        </div>

        <div className="mt-[46px] flex w-full flex-col gap-[24px]">
          {mockChildren.map((child) => {
            const isSelected = selectedChildId === child.id;

            return (
              <div
                key={child.id}
                onClick={() => setSelectedChildId(child.id)}
                className={`flex w-full max-w-[370px] cursor-pointer items-center justify-between rounded-[12px] border p-[12px_16px] transition-colors duration-200 ${
                  isSelected
                    ? "border-[#FF6229] bg-white"
                    : "border-[#DDE1E9] bg-white"
                }`}
              >
                <div className="flex items-center gap-[10px]">
                  <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[1000px] bg-[#F7F8FA] p-[14px]">
                    <img
                      src={boyImg}
                      alt="아이 프로필"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-black">
                      {child.name}
                    </span>
                    <span className="text-[15px] font-normal leading-[20px] tracking-[-0.24px] text-[#4B5565]">
                      만 {child.age}세 ・ {child.gender} ・ 검사{" "}
                      {child.testCount}회
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
                    fill={isSelected ? "#FF6229" : "none"}
                    stroke={isSelected ? "#FF6229" : "#DDE1E9"}
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6 9.5L8.5 12L13 7"
                    stroke={isSelected ? "white" : "#DDE1E9"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            );
          })}
        </div>

        <div className="mt-[24px] flex w-full max-w-[370px] items-center gap-[10px] rounded-[8px] bg-[#FFF7E0] p-[8px]">
          <img
            src={referIcon}
            alt="참고"
            className="h-[24px] w-[24px] shrink-0"
          />
          <p className="text-[13px] font-normal leading-[18px] tracking-[-0.08px] text-[#202939]">
            아이 정보는 분석과 리포트에만 활용되며, 안전하게 보관돼요.
          </p>
        </div>
      </main>

      {/* 하단 고정 버튼 영역 */}
      <div className="fixed bottom-0 left-1/2 w-full max-w-[402px] -translate-x-1/2 bg-white px-[16px] pb-[32px] pt-[16px]">
        <ActionButton
          variant="darkGrey"
          disabled={selectedChildId === null}
          className="w-full"
          showIcon={false}
          onClick={() =>
            console.log(`${selectedChildId}번 아이 선택됨, 다음 페이지로 이동!`)
          }
        >
          다음
        </ActionButton>
      </div>
    </div>
  );
};

export default TestFirstStep;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";

import returnIcon from "../../assets/icons/common/return.svg";
import aiFilledIcon from "../../assets/icons/test/ai_filled.svg";
import referIcon from "../../assets/icons/test/refer.svg";
import checkedIcon from "../../assets/icons/test/checked.svg";
import uncheckedIcon from "../../assets/icons/test/unchecked.svg";

const processSteps = [
  { num: 1, title: "아이 정보 입력", desc: "이름, 나이, 성별" },
  { num: 2, title: "검사 가이드", desc: "심리 검사 가이드 안내" },
  { num: 3, title: "그림 업로드", desc: "집, 나무, 사람이 포함된 그림 이미지" },
  { num: 4, title: "AI 분석 및 결과 확인", desc: "리포트 + 챗봇 상담" },
];

const TestStart = () => {
  const [isConsented, setIsConsented] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col bg-white font-sans pb-[100px]">
      {/* 상단 상태바 */}
      <div className="flex w-full items-center justify-between px-[24px] pb-[19px] pt-[21px]">
        <span className="text-e-subheadline text-black">9:41</span>
        <div className="flex items-center gap-[5px]">
          <div className="h-[10px] w-[17px] rounded-sm bg-black"></div>
          <div className="h-[11px] w-[15px] rounded-sm bg-black"></div>
          <div className="h-[11px] w-[24px] rounded-sm bg-black"></div>
        </div>
      </div>

      {/* 헤더 영역 (뒤로가기 + 타이틀) */}
      <div className="flex h-[68px] w-full items-center justify-start gap-[16px] px-side py-[20px]">
        <img
          src={returnIcon}
          alt="뒤로가기"
          onClick={() => navigate("/test")}
          className="h-[14px] w-[14px] cursor-pointer"
        />
        <h1 className="text-e-title-2 text-grey-800">미술 심리 검사</h1>
      </div>

      {/* 본문 컨텐츠 시작 */}
      <main className="flex flex-col px-side">
        <div className="mt-[24px] flex flex-col">
          <h2 className="text-[24px] font-bold leading-[34px] tracking-[0.36px] text-grey-800">
            검사를 시작하기 전에
          </h2>
          <p className="mt-[4px] text-body-1 text-grey-600">
            아이가 그린 집·나무·사람 그림을 AI가 분석해
            <br />
            정서 상태와 발달 특성을 살펴봐요
          </p>
        </div>

        {/* 진행 순서 타이틀 */}
        <div className="mt-[32px] flex items-center gap-[4px]">
          <img
            src={aiFilledIcon}
            alt="AI 아이콘"
            className="h-[24px] w-[24px]"
          />
          <h3 className="text-e-body-1 text-grey-800">진행 순서</h3>
        </div>

        {/* 진행 순서 박스 */}
        <div className="mt-[16px] flex flex-col gap-[12px]">
          {processSteps.map((step) => (
            <div
              key={step.num}
              className="flex items-center gap-[16px] rounded-sm bg-grey-50 px-side py-[12px]"
            >
              <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-sub-100 text-[13px] font-bold text-sub-500">
                {step.num}
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-e-subheadline text-black">
                  {step.title}
                </span>
                <span className="text-caption-1 text-grey-700">
                  {step.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 노란색 경고 박스 */}
        <div className="mt-[12px] flex flex-col items-start gap-[4px] rounded-sm bg-warning-100 p-[12px]">
          <div className="flex items-center gap-[4px]">
            <img src={referIcon} alt="참고" className="h-[24px] w-[24px]" />
            <span className="text-e-footnote text-warning-500">
              참고해 주세요
            </span>
          </div>
          <p className="text-caption-1 text-grey-900">
            결과는 전문 심리 진단을 대체하지 않으며, 참고 자료로만 활용해주세요.
          </p>
        </div>

        {/* 동의 체크박스 영역 */}
        <div
          onClick={() => setIsConsented(!isConsented)}
          className={`mb-[40px] mt-[32px] flex cursor-pointer items-center gap-[8px] rounded-sm p-[12px] transition-colors duration-200 ${
            isConsented
              ? "border border-transparent bg-main-100"
              : "border border-grey-200 bg-white"
          }`}
        >
          <img
            src={isConsented ? checkedIcon : uncheckedIcon}
            alt="동의 체크박스"
            className="h-[17px] w-[17px] shrink-0"
          />
          <span className="text-footnote text-grey-900">
            아이 그림 이미지가 분석 목적으로만 사용되는 것에 동의합니다.
          </span>
        </div>
      </main>

      {/* 하단 고정 버튼 영역 */}
      <div className="fixed bottom-0 left-1/2 w-full max-w-[402px] -translate-x-1/2 bg-white px-side pb-[32px] pt-[16px]">
        <ActionButton
          variant="darkGrey"
          disabled={!isConsented}
          className="w-full"
          showIcon={false}
          onClick={() => navigate("/test-first-step")}
        >
          검사 시작하기
        </ActionButton>
      </div>
    </div>
  );
};

export default TestStart;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";

import returnIcon from "../../assets/icons/common/return.svg";
import referIcon from "../../assets/icons/test/refer.svg";
import heartDocumentIcon from "../../assets/icons/test/heartdocument.svg";
import alertIcon from "../../assets/icons/test/alert.svg";
import personIcon from "../../assets/icons/test/person.svg";
import questionmarkBalloonIcon from "../../assets/icons/test/questionmarkballoon.svg";
import shareIcon from "../../assets/icons/test/share.svg";
import saveIcon from "../../assets/icons/test/save.svg";

const mockResultData = {
  childName: "길동이",
  age: "만 10세",
  gender: "여아",
  testDate: "2026.05.02 검사",
  summary:
    "길동이는 전반적으로 안정적인 정서 기반을 갖추고 있어요. 집과 사람 그림에서 긍정적인 가족 인식이 느껴지며, 나무 그림은 에너지가 넘치는 현재 상태를 보여줍니다.",
  houseAnalysis: {
    status: "양호",
    desc: "문과 창문이 적절한 크기로 그려져 타인에게 열려 있는 태도를 보여줍니다. 굴뚝이 없는 것은 외부 스트레스를 잘 발산하지 못할 가능성을 시사하기도 합니다.",
    tags: ["개방적 태도", "안정적 가족감"],
    warningTags: ["감정 발산 방식 점검"],
  },
};

const TestResult = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"집" | "사람" | "나무">("집");

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans pb-[40px]">
      {/* 헤더 영역 */}
      <div className="flex h-[68px] w-full items-center justify-start gap-[16px] px-[24px] py-[20px]">
        <img
          src={returnIcon}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
          className="h-[14px] w-[14px] cursor-pointer"
        />
        <h1 className="text-e-title-3 text-grey-900">검사 결과</h1>
      </div>

      <main className="flex flex-col px-[24px]">
        {/* 경고 박스 */}
        <div className="mt-[4px] flex w-full items-center gap-[10px] rounded-[8px] bg-warning-100 p-[8px]">
          <img src={referIcon} alt="참고" className="h-[24px] w-[24px]" />
          <p className="text-[13px] font-normal leading-[18px] tracking-[-0.08px] text-grey-900">
            본 결과는 전문 진단을 대체하지 않습니다.
          </p>
        </div>

        {/* 유저 타이틀 및 태그 */}
        <div className="mt-[16px] flex items-start gap-[16px]">
          <img
            src={heartDocumentIcon}
            alt="마음 이야기 문서"
            className="h-[60px] w-[60px] shrink-0"
          />
          <div className="flex flex-col gap-[8px]">
            <h2 className="text-[20px] font-bold leading-[25px] tracking-[0.38px] text-grey-900">
              {mockResultData.childName}의 마음 이야기
            </h2>
            <div className="flex flex-wrap items-center gap-[8px]">
              <span className="flex items-center justify-center rounded-[4px] bg-main-100 px-[6px] py-[4px] text-[12px] font-semibold leading-[16px] text-main-500">
                {mockResultData.age}
              </span>
              <span className="flex items-center justify-center rounded-[4px] bg-main-100 px-[6px] py-[4px] text-[12px] font-semibold leading-[16px] text-main-500">
                {mockResultData.gender}
              </span>
              <span className="flex items-center justify-center rounded-[4px] bg-main-100 px-[6px] py-[4px] text-[12px] font-semibold leading-[16px] text-main-500">
                {mockResultData.testDate}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* 회색 구분선 */}
      <div className="mt-[16px] h-[13px] w-full bg-grey-100" />

      <main className="flex flex-col px-[24px]">
        {/* 종합 요약 */}
        <h3 className="mt-[16px] text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-grey-900">
          종합 요약을 해드릴게요
        </h3>

        <div className="mt-[16px] flex w-full items-start gap-[8px] rounded-[12px] bg-grey-50 px-[8px] py-[16px]">
          <img
            src={alertIcon}
            alt="알림"
            className="h-[24px] w-[24px] shrink-0"
          />
          <p className="text-[15px] font-normal leading-[20px] tracking-[-0.24px] text-grey-900">
            {mockResultData.summary}
          </p>
        </div>

        {/* 상세 분석 탭 영역 */}
        <h3 className="mt-[32px] text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-grey-900">
          그림 속 요소를 하나씩 살펴봤어요
        </h3>

        <div className="mt-[16px] flex h-[40px] w-full items-center rounded-full bg-grey-100 p-[4px]">
          {["집", "사람", "나무"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex flex-1 items-center justify-center gap-[4px] rounded-full px-[16px] py-[8px] text-[13px] font-semibold leading-[18px] tracking-[-0.08px] transition-colors ${
                activeTab === tab ? "bg-white text-grey-800" : "text-grey-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 그림 업로드 표시 영역 */}
        <div className="relative mt-[8px] flex h-[200px] w-full items-center overflow-hidden rounded-[12px] bg-grey-200">
          <div className="h-full w-full bg-[url('https://via.placeholder.com/370x200')] bg-cover bg-center bg-no-repeat opacity-50" />

          <div className="absolute left-[8%] top-[25%] h-[104px] w-[120px] rounded-[8px] border border-error-500 bg-error-500/10">
            <div className="absolute -top-[28px] left-[0px] flex items-center justify-center gap-[10px] rounded-[4px] bg-error-500 px-[6px] py-[4px]">
              <span className="text-[12px] font-semibold leading-[16px] text-white">
                집
              </span>
            </div>
          </div>
        </div>

        {/* 분석 카드 */}
        <div className="mt-[8px] flex w-full flex-col gap-[8px] rounded-[12px] border border-grey-200 bg-white p-[12px]">
          <div className="flex w-full items-start gap-[16px]">
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[8px] bg-error-100">
              <span className="text-[20px]">🏠</span>
            </div>

            <div className="flex flex-1 flex-col gap-0">
              <div className="flex w-full items-center justify-between">
                <span className="text-[15px] font-semibold leading-[20px] tracking-[-0.24px] text-grey-900">
                  정서・가족 인식
                </span>
                <div className="flex items-center justify-center rounded-[4px] bg-success-100 px-[6px] py-[4px]">
                  <span className="text-[12px] font-semibold leading-[16px] text-success-500">
                    {mockResultData.houseAnalysis.status}
                  </span>
                </div>
              </div>
              <span className="text-[12px] font-normal leading-[16px] text-grey-600">
                집 그림 기반
              </span>
            </div>
          </div>

          <p className="mt-[8px] text-[13px] font-normal leading-[18px] tracking-[-0.08px] text-black">
            {mockResultData.houseAnalysis.desc}
          </p>

          <div className="mt-[8px] flex flex-wrap items-center gap-[8px]">
            {mockResultData.houseAnalysis.tags.map((tag, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center rounded-[4px] border border-sub-200 bg-sub-100 px-[6px] py-[4px]"
              >
                <span className="text-[12px] font-semibold leading-[16px] text-sub-500">
                  {tag}
                </span>
              </div>
            ))}
            {mockResultData.houseAnalysis.warningTags.map((tag, idx) => (
              <div
                key={`warning-${idx}`}
                className="flex items-center justify-center rounded-[4px] border border-main-200 bg-main-100 px-[6px] py-[4px]"
              >
                <span className="text-[12px] font-semibold leading-[16px] text-main-500">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 추천 활동 */}
        <h3 className="mt-[32px] text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-grey-900">
          이런 활동을 해보세요
        </h3>

        <div className="mt-[16px] flex w-full items-start gap-[12px] rounded-[12px] bg-grey-50 p-[12px]">
          <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-sub-100">
            <span className="text-center font-[SF_Pro] text-[14px] font-semibold text-sub-500">
              1
            </span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <h4 className="text-[15px] font-semibold leading-[20px] tracking-[-0.24px] text-grey-900">
              집에서 함께 그림 그리기
            </h4>
            <p className="text-[13px] font-normal leading-[18px] tracking-[-0.08px] text-grey-600">
              아이와 함께 가족 그림을 그리고 이야기를 나눠보세요. 자연스럽게
              감정을 표현하는 데 도움이 됩니다.
            </p>
          </div>
        </div>

        <div className="mt-[8px] flex w-full items-start gap-[12px] rounded-[12px] bg-grey-50 p-[12px]">
          <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-sub-100">
            <span className="text-center font-[SF_Pro] text-[14px] font-semibold text-sub-500">
              2
            </span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <h4 className="text-[15px] font-semibold leading-[20px] tracking-[-0.24px] text-grey-900">
              자연 속 놀이 활동 권장
            </h4>
            <p className="text-[13px] font-normal leading-[18px] tracking-[-0.08px] text-grey-600">
              흙 놀이, 모래 놀이처럼 뿌리(안정감)를 키우는 신체 활동이 도움이
              됩니다.
            </p>
          </div>
        </div>

        {/* 전문 상담 고려 */}
        <div className="mt-[8px] flex w-full flex-col items-start gap-[10px] rounded-[12px] bg-warning-100 p-[12px]">
          <div className="flex items-center gap-[8px]">
            <img src={personIcon} alt="전문가" className="h-[24px] w-[24px]" />
            <span className="text-[15px] font-semibold leading-[20px] tracking-[-0.24px] text-grey-900">
              전문 상담 고려
            </span>
          </div>
          <p className="text-[13px] font-normal leading-[18px] tracking-[-0.08px] text-grey-900">
            결과가 걱정되시거나 아이에게 지속적인 변화가 보인다면, 아동 심리
            전문가와 상담해 보시는 것을 권합니다.
          </p>
        </div>

        {/* AI 상담사 유도 박스 */}
        <div className="mt-[32px] flex w-full flex-col items-center justify-center gap-[16px] rounded-[12px] border border-main-200 bg-white p-[16px]">
          <div className="flex items-center gap-[8px]">
            <img
              src={questionmarkBalloonIcon}
              alt="질문"
              className="h-[24px] w-[24px]"
            />
            <span className="text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-grey-900">
              아이에 대한 궁금한 점이 있다면
            </span>
          </div>

          <ActionButton
            variant="lightOrange"
            size="md"
            className="w-full"
            showIcon={false}
          >
            AI 상담사와 대화하기
          </ActionButton>
        </div>

        {/* 하단 공유 / PDF 버튼 */}
        <div className="mt-[16px] mb-[40px] flex w-full items-center gap-[14px]">
          <button className="flex cursor-pointer h-[42px] flex-1 items-center justify-center gap-[6px] rounded-[8px] bg-sub-100 transition-colors active:bg-sub-200">
            <img src={shareIcon} alt="공유" className="h-[24px] w-[24px]" />
            <span className="text-[15px] font-semibold leading-[20px] tracking-[-0.24px] text-sub-500">
              공유하기
            </span>
          </button>

          <button className="flex cursor-pointer h-[42px] flex-1 items-center justify-center gap-[6px] rounded-[8px] bg-sub-100 transition-colors active:bg-sub-200">
            <img src={saveIcon} alt="PDF 저장" className="h-[24px] w-[24px]" />
            <span className="text-[15px] font-semibold leading-[20px] tracking-[-0.24px] text-sub-500">
              PDF 저장하기
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default TestResult;

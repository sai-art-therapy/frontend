import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";

import returnIcon from "../../assets/icons/common/return.svg";
import treeIcon from "../../assets/icons/test/tree.svg";
import fileIcon from "../../assets/icons/test/file.svg";
import penIcon from "../../assets/icons/test/pen.svg";
import greenCheckIcon from "../../assets/icons/test/greencheck.svg";
import referIcon from "../../assets/icons/test/refer.svg";

const TestSecondStep = () => {
  const navigate = useNavigate();

  const guideSteps = [
    {
      title: '"집, 나무, 사람을 그려볼까?"',
      desc: "그릴 대상만 알려주고 자유롭게 두세요",
    },
    {
      title: "배치, 크기, 순서는 자유롭게",
      desc: "아이가 그리고 싶은 대로 두는 게 가장 좋아요",
    },
    {
      title: "시간 제한은 없어요",
      desc: "충분히 시간을 두고 천천히 그릴 수 있게 해주세요",
    },
  ];

  return (
    <div className="flex w-full flex-col bg-white font-sans min-h-screen">
      <div className="flex w-full items-center justify-between px-[24px] pb-[19px] pt-[21px]">
        <span className="text-subheadline font-semibold text-black">9:41</span>
        <div className="flex items-center gap-[5px]">
          <div className="h-[10px] w-[17px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[15px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[24px] rounded-xs bg-black"></div>
        </div>
      </div>

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
          <div className="h-[5px] flex-1 rounded-full bg-main-500"></div>
          <div className="h-[5px] flex-1 rounded-full bg-grey-200"></div>
        </div>

        <img
          src={treeIcon}
          alt="나무"
          className="mt-[35px] h-[48px] w-[48px]"
        />
        <div className="mt-[8px] flex flex-col">
          <h2 className="text-e-title-1 text-grey-900">
            아이와 함께 그림을 준비해요
          </h2>
          <p className="mt-[4px] text-body-1 text-grey-600">
            한 장의 종이에 집, 나무, 사람을 모두 그려주세요
          </p>
        </div>

        <h3 className="mt-[40px] text-e-body-1 text-black">준비물</h3>
        <div className="mt-[16px] flex w-full gap-[12px]">
          <div className="flex flex-1 items-center justify-center gap-[8px] rounded-sm border border-grey-200 bg-white py-[12px]">
            <img src={fileIcon} alt="종이" className="h-[19px] w-[15px]" />
            <span className="text-e-subheadline text-grey-900">
              A4 용지 1장
            </span>
          </div>
          <div className="flex flex-1 items-center justify-center gap-[8px] rounded-sm border border-grey-200 bg-white py-[12px]">
            <img src={penIcon} alt="연필" className="h-[19px] w-[19px]" />
            <span className="text-e-subheadline text-grey-900">
              연필 또는 색연필
            </span>
          </div>
        </div>

        <h3 className="mt-[24px] text-e-body-1 text-black">
          이렇게 알려주세요
        </h3>
        <div className="mt-[16px] flex flex-col gap-[8px]">
          {guideSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-[16px] rounded-md bg-grey-50 p-[12px]"
            >
              <img
                src={greenCheckIcon}
                alt="체크"
                className="h-spacing-icon-sm w-spacing-icon-sm shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-e-subheadline text-grey-900">
                  {step.title}
                </span>
                <span className="text-footnote text-grey-900">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[16px] mb-[20px] flex w-full items-center gap-[10px] rounded-sm bg-warning-100 p-[12px]">
          <img
            src={referIcon}
            alt="참고"
            className="h-spacing-icon-sm w-spacing-icon-sm shrink-0"
          />
          <p className="text-footnote text-grey-900 whitespace-pre-line">
            아이의 자연스러운 표현이 가장 정확한 분석으로 이어져요.{"\n"}
            옆에서 조용히 지켜봐 주세요.
          </p>
        </div>
      </main>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[402px] -translate-x-1/2 bg-white px-side pb-[32px] pt-[16px]">
        <ActionButton
          variant="darkGrey"
          className="w-full"
          showIcon={false}
          onClick={() => navigate("/test-third-step")}
        >
          다음
        </ActionButton>
      </div>
    </div>
  );
};

export default TestSecondStep;

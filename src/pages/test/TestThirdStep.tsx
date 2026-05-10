import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";

import returnIcon from "../../assets/icons/common/return.svg";
import uploadpictureIcon from "../../assets/icons/test/uploadpicture.svg";
import cameraIcon from "../../assets/icons/test/camera.svg";
import albumIcon from "../../assets/icons/test/album.svg";
import plusbeforexIcon from "../../assets/icons/test/plusbeforex.svg";
import xafterplusIcon from "../../assets/icons/test/xafterplus.svg";
import referIcon from "../../assets/icons/test/refer.svg";

const TestThirdStep = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
          <div className="h-[5px] flex-1 rounded-full bg-main-500"></div>
        </div>

        <img
          src={uploadpictureIcon}
          alt="그림 업로드"
          className="mt-[35px] h-[48px] w-[48px]"
        />

        <div className="mt-[8px] flex flex-col">
          <h2 className="text-e-title-1 text-grey-900">
            그림을 업로드해 주세요
          </h2>
          <p className="mt-[4px] text-body-1 text-grey-600 whitespace-pre-line">
            집, 나무, 사람이 함께 있는 그림을{"\n"}한 장의 사진으로 올려주세요
          </p>
        </div>

        <div className="mt-[40px] flex w-full flex-col gap-[16px]">
          {/* 사진 촬영 옵션 */}
          <div
            onClick={() => setSelectedOption("camera")}
            className={`flex w-full cursor-pointer items-center justify-between rounded-md border p-[16px] transition-colors duration-200 ${
              selectedOption === "camera"
                ? "border-[#FFA98A] bg-white"
                : "border-grey-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-[16px]">
              <div
                className={`flex items-center justify-center gap-[10px] rounded-sm p-[16px] transition-colors duration-200 ${
                  selectedOption === "camera" ? "bg-[#FFF0EB]" : "bg-grey-50"
                }`}
              >
                <div
                  className={`h-[24px] w-[24px] transition-colors duration-200 ${
                    selectedOption === "camera"
                      ? "bg-[#FF6229]"
                      : "bg-[#8B97A7]"
                  }`}
                  style={{
                    WebkitMaskImage: `url("${cameraIcon}")`,
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                    maskImage: `url("${cameraIcon}")`,
                    maskSize: "contain",
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                  }}
                />
              </div>
              <span className="text-e-title-3 text-grey-800 line-clamp-1">
                사진 촬영
              </span>
            </div>
            <img
              src={
                selectedOption === "camera" ? xafterplusIcon : plusbeforexIcon
              }
              alt="선택"
              className="h-[19px] w-[19px] shrink-0"
            />
          </div>

          {/* 앨범 선택 옵션 */}
          <div
            onClick={() => setSelectedOption("album")}
            className={`flex w-full cursor-pointer items-center justify-between rounded-md border p-[16px] transition-colors duration-200 ${
              selectedOption === "album"
                ? "border-[#FFA98A] bg-white"
                : "border-grey-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-[16px]">
              <div
                className={`flex items-center justify-center gap-[10px] rounded-sm p-[16px] transition-colors duration-200 ${
                  selectedOption === "album" ? "bg-[#FFF0EB]" : "bg-grey-50"
                }`}
              >
                <div
                  className={`h-[24px] w-[24px] transition-colors duration-200 ${
                    selectedOption === "album" ? "bg-[#FF6229]" : "bg-[#8B97A7]"
                  }`}
                  style={{
                    WebkitMaskImage: `url("${albumIcon}")`,
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                    maskImage: `url("${albumIcon}")`,
                    maskSize: "contain",
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                  }}
                />
              </div>
              <span className="text-e-title-3 text-grey-800 line-clamp-1">
                앨범에서 선택
              </span>
            </div>
            <img
              src={
                selectedOption === "album" ? xafterplusIcon : plusbeforexIcon
              }
              alt="선택"
              className="h-[19px] w-[19px] shrink-0"
            />
          </div>
        </div>

        <div className="mt-[32px] mb-[32px] flex w-full items-center gap-[8px] rounded-sm bg-warning-100 p-[8px]">
          <img
            src={referIcon}
            alt="참고"
            className="h-[24px] w-[24px] shrink-0"
          />
          <p className="text-footnote text-grey-900">
            밝은 곳에서 그림 전체가 잘 보이도록 정면에서 촬영해 주세요
          </p>
        </div>
      </main>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[402px] -translate-x-1/2 bg-white px-side pb-[32px] pt-[16px]">
        <ActionButton
          variant="darkGrey"
          disabled={selectedOption === null}
          className="w-full"
          showIcon={false}
          onClick={() => {
            if (selectedOption === "camera") {
              navigate("/test-loading-step"); //test-camera-upload 으로 수정 예정
            } else {
              navigate("/test-loading-step"); //test-album-upload 으로 수정 예정
            }
          }}
        >
          분석 시작하기
        </ActionButton>
      </div>
    </div>
  );
};

export default TestThirdStep;

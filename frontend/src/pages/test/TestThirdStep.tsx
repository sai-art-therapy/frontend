import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";

import returnIcon from "../../assets/icons/common/return.svg";
import uploadpictureIcon from "../../assets/icons/test/uploadpicture.svg";
import cameraIcon from "../../assets/icons/test/camera.svg";
import albumIcon from "../../assets/icons/test/album.svg";
import drawIcon from "../../assets/icons/draw/draw.svg";
import plusbeforexIcon from "../../assets/icons/test/plusbeforex.svg";
import xafterplusIcon from "../../assets/icons/test/xafterplus.svg";
import referIcon from "../../assets/icons/test/refer.svg";

import { useAppMutation } from "../../hooks/apiHooks";
import { uploadTestImage } from "../../apis/test/test";
import type { UploadTestImageResponse } from "../../types/test.type";
import { saveImageToSessionAsBase64 } from "../../utils/image";

const TestThirdStep = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const testId = location.state?.testId;
  const childId = location.state?.childId;

  const [selectedOption, setSelectedOption] = useState<
    "draw" | "camera" | "album" | null
  >(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const albumInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDimension = 1000;

          if (width > height) {
            if (width > maxDimension) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(file);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            "image/jpeg",
            0.7,
          );
        };
      };
    });
  };

  const { mutate: uploadImage, isPending } = useAppMutation<
    UploadTestImageResponse,
    { testId: number; file: File }
  >(({ testId, file }) => uploadTestImage(testId, file), {
    onSuccess: async (_data, variables) => {
      const targetFile = variables.file;
      // 백엔드 응답은 객체이며 브라우저에서 바로 쓸 이미지 URL을 주지 않으므로,
      // 미리보기 화면에서 이미 만들어둔 previewUrl을 그대로 사용한다.
      const uploadedImageUrl = previewUrl;

      try {
        await saveImageToSessionAsBase64(targetFile);
      } catch (err) {
        console.warn("⚠️ 이미지 세션 저장 실패:", err);
      }

      navigate("/test-loading-step", {
        state: {
          childId,
          testId: Number(testId),
          imageUrl: uploadedImageUrl,
          imageFile: targetFile,
        },
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        JSON.stringify(error);
      alert(`🚨 에러 상세 원인: ${errorMessage}`);
    },
  });

  const handleOptionClick = (option: "draw" | "camera" | "album") => {
    if (selectedOption === option) {
      setSelectedOption(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setSelectedFile(null);
      }
      return;
    }

    setSelectedOption(option);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setSelectedFile(null);
    }

    if (option === "camera" && cameraInputRef.current) {
      cameraInputRef.current.click();
    } else if (option === "album" && albumInputRef.current) {
      albumInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (previewUrl) URL.revokeObjectURL(previewUrl);

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedOption(null);
    }
  };

  const handleUploadSubmit = async () => {
    if (selectedOption === "draw") {
      navigate("/test-drawing-step", {
        state: {
          testId,
          childId,
        },
      });
      return;
    }

    if (!testId) {
      alert("검사 정보가 누락되었습니다. 첫 페이지부터 다시 진행해 주세요.");
      navigate("/test");
      return;
    }
    if (!selectedFile) {
      alert("업로드할 그림 사진이 없습니다.");
      return;
    }

    try {
      const targetFile =
        selectedFile.size > 1024 * 1024
          ? await compressImage(selectedFile)
          : selectedFile;

      uploadImage({ testId: Number(testId), file: targetFile });
    } catch (error) {
      alert("이미지 처리 중 오류가 발생했습니다.");
    }
  };

  const isButtonEnabled =
    selectedOption === "draw" || (selectedFile !== null && previewUrl !== null);

  return (
    <div className="flex w-full flex-col bg-white font-sans min-h-screen relative">
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
          <h2 className="text-e-title-1 text-grey-900">그림을 그려주세요</h2>
          <p className="mt-[4px] text-body-1 text-grey-600 whitespace-pre-line">
            집, 나무, 사람이 함께 있는 그림을 그려주세요
          </p>
        </div>

        <input
          type="file"
          ref={albumInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          type="file"
          ref={cameraInputRef}
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="mt-[40px] flex w-full flex-col">
          {/* 앱에서 그림 그리기 버튼 */}
          <div
            onClick={() => handleOptionClick("draw")}
            className={`flex w-full cursor-pointer items-center justify-between rounded-md border p-[16px] transition-colors duration-200 ${
              selectedOption === "draw"
                ? "border-main-300 bg-white"
                : "border-grey-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-[16px]">
              <div
                className={`flex items-center justify-center gap-[10px] rounded-sm p-[16px] transition-colors duration-200 ${
                  selectedOption === "draw" ? "bg-main-100" : "bg-grey-50"
                }`}
              >
                <div
                  className={`h-[24px] w-[24px] transition-colors duration-200 ${
                    selectedOption === "draw" ? "bg-main-500" : "bg-grey-500"
                  }`}
                  style={{
                    WebkitMaskImage: `url("${drawIcon}")`,
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                    maskImage: `url("${drawIcon}")`,
                    maskSize: "contain",
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                  }}
                />
              </div>
              <span className="text-e-title-3 text-grey-800 line-clamp-1">
                앱에서 그림 그리기
              </span>
            </div>
            <img
              src={selectedOption === "draw" ? xafterplusIcon : plusbeforexIcon}
              alt="선택"
              className="h-[14px] w-[14px] shrink-0"
            />
          </div>

          <div className="my-[16px] flex w-full justify-center items-center gap-[16px]">
            <div className="w-[160px] h-[1px] bg-grey-200 flex-1" />
            <span className="text-footnote text-grey-500 shrink-0">OR</span>
            <div className="w-[160px] h-[1px] bg-grey-200 flex-1" />
          </div>

          {/* 사진 촬영, 앨범 선택 버튼 */}
          <div className="flex w-full flex-col gap-[16px]">
            <div
              onClick={() => handleOptionClick("camera")}
              className={`flex w-full cursor-pointer items-center justify-between rounded-md border p-[16px] transition-colors duration-200 ${
                selectedOption === "camera"
                  ? "border-main-300 bg-white"
                  : "border-grey-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-[16px]">
                <div
                  className={`flex items-center justify-center gap-[10px] rounded-sm p-[16px] transition-colors duration-200 ${
                    selectedOption === "camera" ? "bg-main-100" : "bg-grey-50"
                  }`}
                >
                  <div
                    className={`h-[24px] w-[24px] transition-colors duration-200 ${
                      selectedOption === "camera"
                        ? "bg-main-500"
                        : "bg-grey-500"
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
                className="h-[14px] w-[14px] shrink-0"
              />
            </div>

            <div
              onClick={() => handleOptionClick("album")}
              className={`flex w-full cursor-pointer items-center justify-between rounded-md border p-[16px] transition-colors duration-200 ${
                selectedOption === "album"
                  ? "border-main-300 bg-white"
                  : "border-grey-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-[16px]">
                <div
                  className={`flex items-center justify-center gap-[10px] rounded-sm p-[16px] transition-colors duration-200 ${
                    selectedOption === "album" ? "bg-main-100" : "bg-grey-50"
                  }`}
                >
                  <div
                    className={`h-[24px] w-[24px] transition-colors duration-200 ${
                      selectedOption === "album" ? "bg-main-500" : "bg-grey-500"
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
                className="h-[14px] w-[14px] shrink-0"
              />
            </div>
          </div>
        </div>

        {previewUrl && (
          <div className="mt-[20px] flex flex-col items-center gap-[8px] rounded-md border border-grey-100 bg-grey-50 p-[12px]">
            <span className="text-caption-1 font-semibold text-grey-700">
              등록 예정 파일 미리보기
            </span>
            <img
              src={previewUrl}
              alt="그림 미리보기"
              className="max-h-[160px] rounded-sm object-contain shadow-xs"
            />
            <span className="text-[11px] text-grey-400 max-w-full truncate">
              {selectedFile?.name || "촬영된 사진"}
            </span>
          </div>
        )}

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
        <div className="flex w-full items-center gap-[16px]">
          <ActionButton
            variant="darkGrey"
            disabled={!isButtonEnabled || isPending}
            className="w-full"
            showIcon={false}
            onClick={handleUploadSubmit}
          >
            {isPending ? "이미지 분석 요청 중..." : "분석 시작하기"}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default TestThirdStep;

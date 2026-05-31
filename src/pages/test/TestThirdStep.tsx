import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";

import returnIcon from "../../assets/icons/common/return.svg";
import uploadpictureIcon from "../../assets/icons/test/uploadpicture.svg";
import cameraIcon from "../../assets/icons/test/camera.svg";
import albumIcon from "../../assets/icons/test/album.svg";
import plusbeforexIcon from "../../assets/icons/test/plusbeforex.svg";
import xafterplusIcon from "../../assets/icons/test/xafterplus.svg";
import referIcon from "../../assets/icons/test/refer.svg";

import { useAppMutation } from "../../hooks/apiHooks";
import { uploadTestImage } from "../../apis/test/test";

const TestThirdStep = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const testId = location.state?.testId;
  const childId = location.state?.childId;

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const albumInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadImage, isPending } = useAppMutation<string, any>(
    ({ testId, file }: { testId: number; file: File }) =>
      uploadTestImage(testId, file),
    {
      onSuccess: (data) => {
        console.log("그림 이미지 업로드 성공:", data);
        const uploadedImageUrl = typeof data === "string" ? data : previewUrl;

        navigate("/test-loading-step", {
          state: {
            childId,
            testId: Number(testId),
            imageUrl: uploadedImageUrl,
          },
        });
      },
      onError: (error) => {
        console.error("그림 이미지 업로드 실패:", error);
        alert("이미지 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.");
      },
    },
  );

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("카메라 권한을 획득할 수 없습니다:", err);
      alert(
        "카메라를 시작할 수 없습니다. 장치 연결이나 브라우저 권한 설정을 확인해 주세요.",
      );
      setSelectedOption(null);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File(
                [blob],
                `captured_image_${Date.now()}.jpg`,
                {
                  type: "image/jpeg",
                },
              );
              setSelectedFile(file);
              setPreviewUrl(URL.createObjectURL(file));
              stopCamera();
            }
          },
          "image/jpeg",
          0.9,
        );
      }
    }
  };

  const handleOptionClick = (option: "camera" | "album") => {
    setSelectedOption(option);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setSelectedFile(null);
    }

    if (option === "camera") {
      startCamera();
    } else if (option === "album" && albumInputRef.current) {
      stopCamera();
      albumInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedOption(null);
    }
  };

  const handleUploadSubmit = () => {
    if (!testId) {
      alert("검사 정보가 누락되었습니다. 첫 페이지부터 다시 진행해 주세요.");
      navigate("/test");
      return;
    }
    if (!selectedFile) {
      alert("업로드할 그림 사진이 없습니다.");
      return;
    }
    uploadImage({ testId: Number(testId), file: selectedFile });
  };

  return (
    <div className="flex w-full flex-col bg-white font-sans min-h-screen relative">
      {isCameraActive && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black max-w-[402px] left-1/2 -translate-x-1/2 w-full h-full">
          <div className="flex justify-between items-center px-side py-4 text-white">
            <span className="text-e-title-3">그림 촬영하기</span>
            <button
              onClick={() => {
                stopCamera();
                setSelectedOption(null);
              }}
              className="text-body-1 font-semibold text-grey-400"
            >
              취소
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-hidden bg-zinc-900">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-auto max-h-[70vh] object-cover"
            />
          </div>

          <div className="h-[120px] flex items-center justify-center bg-black">
            <button
              onClick={capturePhoto}
              className="w-[72px] h-[72px] rounded-full border-[6px] border-white bg-main-500 hover:bg-main-600 transition-colors active:scale-95"
              title="촬영하기"
            />
          </div>
        </div>
      )}

      <div className="flex w-full items-center justify-between px-[24px] pb-[19px] pt-[21px]">
        <span
          className="text-subheadline font-semibold invisible"
          aria-hidden="true"
        >
          9:41
        </span>
        <div
          className="flex items-center gap-[5px] invisible"
          aria-hidden="true"
        >
          <div className="h-[10px] w-[17px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[15px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[24px] rounded-xs bg-black"></div>
        </div>
      </div>

      <div className="flex h-[68px] w-full items-center justify-start gap-[16px] px-side py-[20px]">
        <img
          src={returnIcon}
          alt="뒤로가기"
          onClick={() => {
            stopCamera();
            navigate(-1);
          }}
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

        <input
          type="file"
          ref={albumInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="mt-[40px] flex w-full flex-col gap-[16px]">
          <div
            onClick={() => handleOptionClick("camera")}
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
              className="h-[14px] w-[14px] shrink-0"
            />
          </div>

          <div
            onClick={() => handleOptionClick("album")}
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
              className="h-[14px] w-[14px] shrink-0"
            />
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
        <ActionButton
          variant="darkGrey"
          disabled={!selectedFile || isPending}
          className="w-full"
          showIcon={false}
          onClick={handleUploadSubmit}
        >
          {isPending ? "이미지 분석 요청 중..." : "분석 시작하기"}
        </ActionButton>
      </div>
    </div>
  );
};

export default TestThirdStep;

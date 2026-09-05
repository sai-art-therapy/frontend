import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { TopBar } from "../../components/common/TopBar";
import { DrawingToolbar } from "../../components/draw/DrawingToolbar";
import type { ToolType } from "../../components/draw/DrawingToolbar";
import { ColorPicker, PALETTE_COLORS } from "../../components/draw/ColorPicker";
import { Canvas } from "../../components/draw/Canvas";
import type { CanvasRef } from "../../components/draw/Canvas";

import { useAppMutation } from "../../hooks/apiHooks";
import { uploadCanvasDrawing } from "../../apis/test/test";
import type { CanvasDrawingData, CanvasDrawingUploadResponse } from "../../types/test.type";
import { saveImageToSessionAsBase64 } from "../../utils/image";

const DRAWING_NOT_REPLACEABLE_MESSAGE =
  "이미 분석이 진행된 검사라 그림을 다시 제출할 수 없습니다. 검사를 새로 시작해 주세요.";

const TestDrawingStep = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const testId = location.state?.testId;
  const childId = location.state?.childId;

  const canvasRef = useRef<CanvasRef>(null);

  const [activeTool, setActiveTool] = useState<ToolType>("pen");
  const [selectedColor, setSelectedColor] = useState<string>(PALETTE_COLORS[0]);
  const [strokeCount, setStrokeCount] = useState(0);

  const { mutate: submitDrawing, isPending } = useAppMutation<
    CanvasDrawingUploadResponse,
    { pngFile: File; drawingData: CanvasDrawingData }
  >(
    ({ pngFile, drawingData }) =>
      uploadCanvasDrawing(Number(testId), pngFile, drawingData),
    {
      onSuccess: async (_data, variables) => {
        try {
          await saveImageToSessionAsBase64(variables.pngFile);
        } catch (err) {
          console.warn("⚠️ 이미지 세션 저장 실패:", err);
        }

        navigate("/test-loading-step", {
          state: {
            testId: Number(testId),
            childId,
            drawingSource: "canvas",
            imageFile: variables.pngFile,
            imageUrl: URL.createObjectURL(variables.pngFile),
          },
        });
      },
      onError: (error) => {
        const detail = error.response?.data?.detail;
        const code =
          typeof detail === "object" && !Array.isArray(detail)
            ? detail?.code
            : undefined;

        if (error.response?.status === 409 || code === "drawing_not_replaceable") {
          alert(DRAWING_NOT_REPLACEABLE_MESSAGE);
          navigate("/test", { replace: true });
          return;
        }

        const detailMessage =
          typeof detail === "string"
            ? detail
            : Array.isArray(detail)
              ? detail[0]?.msg
              : detail?.message;

        alert(detailMessage ?? error.message ?? "업로드에 실패했습니다.");
      },
    },
  );

  const handleBack = () => {
    if (isPending) return;
    navigate(-1);
  };

  const handleUndo = () => {
    if (isPending) return;
    canvasRef.current?.undo();
  };

  const handleComplete = async () => {
    if (!testId) {
      alert("검사 정보가 누락되었습니다. 첫 페이지부터 다시 진행해 주세요.");
      navigate("/test");
      return;
    }
    if (!canvasRef.current || strokeCount === 0 || isPending) return;

    const pngFile = await canvasRef.current.getImageFile("drawing.png");
    if (!pngFile) {
      alert("그림 이미지를 만들지 못했습니다. 다시 시도해 주세요.");
      return;
    }

    const drawingData = canvasRef.current.getDrawingData();
    submitDrawing({ pngFile, drawingData });
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white font-sans select-none">
      <TopBar
        variant="action"
        title="그림 그리기"
        rightText={isPending ? "제출 중..." : "완료"}
        isActionDisabled={strokeCount === 0 || isPending}
        onBackClick={handleBack}
        onRightAction={handleComplete}
      />

      <DrawingToolbar
        activeTool={activeTool}
        onSelectTool={setActiveTool}
        onUndo={handleUndo}
      />

      <div className="mt-[15px]">
        <ColorPicker selectedColor={selectedColor} onSelectColor={setSelectedColor} />
      </div>

      <div className="relative w-full flex-1">
        <Canvas
          ref={canvasRef}
          activeTool={activeTool}
          selectedColor={selectedColor}
          onStrokeCountChange={setStrokeCount}
        />
      </div>
    </div>
  );
};

export default TestDrawingStep;

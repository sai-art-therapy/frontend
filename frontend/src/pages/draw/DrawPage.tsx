import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";
import { DrawingToolbar } from "../../components/draw/DrawingToolbar";
import type { ToolType } from "../../components/draw/DrawingToolbar";
import { ColorPicker, PALETTE_COLORS } from "../../components/draw/ColorPicker";
import { Canvas } from "../../components/draw/Canvas";
import type { CanvasRef } from "../../components/draw/Canvas";

export const DrawPage: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<CanvasRef>(null);

  const [activeTool, setActiveTool] = useState<ToolType>("pen");
  const [selectedColor, setSelectedColor] = useState<string>(PALETTE_COLORS[0]);

  const handleBack = () => {
    navigate(-1);
  };

  // 완료 버튼 클릭 시 캔버스를 File 객체로 변환하여 전송 준비
  const handleComplete = async () => {
    if (!canvasRef.current) return;

    // 캔버스 그림을 File 객체로 생성
    const imageFile = await canvasRef.current.getImageFile("drawing.png");

    // Stroke 분석 데이터가 필요한 경우 추출
    const strokeData = canvasRef.current.getStrokes();

    if (imageFile) {
      console.log("생성된 이미지 파일:", imageFile);
      console.log("수집된 Stroke 데이터:", strokeData);
    }
  };

  // Undo 버튼
  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white select-none overflow-hidden">
      {/* 상단 헤더 */}
      <TopBar
        variant="action"
        title="그림 그리기"
        rightText="완료"
        onBackClick={handleBack}
        onRightAction={handleComplete}
      />

      {/* 도구 툴바 */}
      <DrawingToolbar
        activeTool={activeTool}
        onSelectTool={setActiveTool}
        onUndo={handleUndo}
      />

      {/* 팔레트 색상 선택기 */}
      <div className="mt-[15px]">
        <ColorPicker
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      </div>

      {/* Canvas 드로잉 영역 */}
      <div className="flex-1 w-full relative">
        <Canvas
          ref={canvasRef}
          activeTool={activeTool}
          selectedColor={selectedColor}
        />
      </div>
    </div>
  );
};

export default DrawPage;

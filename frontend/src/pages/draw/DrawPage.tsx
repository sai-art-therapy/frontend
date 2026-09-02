import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";
import { DrawingToolbar } from "../../components/draw/DrawingToolbar";
import type { ToolType } from "../../components/draw/DrawingToolbar";
import { ColorPicker, PALETTE_COLORS } from "../../components/draw/ColorPicker";

export const DrawPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<ToolType>("pen");
  const [selectedColor, setSelectedColor] = useState<string>(PALETTE_COLORS[0]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleComplete = () => {
    // TODO: 저장 로직
  };

  const handleUndo = () => {
    // TODO: 되돌리기 로직
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white select-none">
      <TopBar
        variant="action"
        title="그림 그리기"
        rightText="완료"
        onBackClick={handleBack}
        onRightAction={handleComplete}
      />

      <DrawingToolbar
        activeTool={activeTool}
        onSelectTool={setActiveTool}
        onUndo={handleUndo}
      />

      <div className="mt-[15px]">
        <ColorPicker
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      </div>

      <div className="flex-1 w-full relative touch-none"></div>
    </div>
  );
};

export default DrawPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";
import { DrawingToolbar } from "../../components/draw/DrawingToolbar";
import type { ToolType } from "../../components/draw/DrawingToolbar";

export const DrawPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<ToolType>("pen");

  const handleBack = () => {
    navigate(-1);
  };

  const handleComplete = () => {
  };

  const handleUndo = () => {
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

      <div className="flex-1 w-full relative touch-none">
      </div>
    </div>
  );
};

export default DrawPage;
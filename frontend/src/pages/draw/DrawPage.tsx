import React from "react";
import { TopBar } from "../../components/common/TopBar";
import { DrawingToolbar } from "../../components/draw/DrawingToolbar";
import { ColorPicker } from "../../components/draw/ColorPicker";
import { Canvas } from "../../components/draw/Canvas";

export const DrawPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      <TopBar
        variant="action"
        title="그림 그리기"
        rightText="완료"
        onBackClick={() => {}}
        onRightAction={() => {}}
      />
      <div className="flex-1 flex flex-col">
        <DrawingToolbar />
        <ColorPicker />
        <Canvas />
      </div>
    </div>
  );
};

export default DrawPage;
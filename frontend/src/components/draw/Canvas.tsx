import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import type { ToolType } from "./DrawingToolbar";

export interface StrokePoint {
  x: number;
  y: number;
  time: number;
  pressure: number;
}

export interface StrokeData {
  tool: ToolType;
  color: string;
  lineWidth: number;
  points: StrokePoint[];
}

export interface CanvasRef {
  undo: () => void;
  clear: () => void;
  getImageFile: (filename?: string) => Promise<File | null>;
  getStrokes: () => StrokeData[];
}

interface CanvasProps {
  activeTool: ToolType;
  selectedColor: string;
  lineWidth?: number;
  eraserWidth?: number;
}

export const Canvas = forwardRef<CanvasRef, CanvasProps>(
  ({ activeTool, selectedColor, lineWidth = 4, eraserWidth = 20 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDrawingRef = useRef<boolean>(false);

    // Undo 기능을 위한 히스토리
    const historyRef = useRef<ImageData[]>([]);

    // 분석을 위한 Stroke 데이터 수집
    const strokeListRef = useRef<StrokeData[]>([]);
    const currentStrokeRef = useRef<StrokePoint[]>([]);

    // 캔버스 크기 지정 및 고해상도 처리
    const resizeAndInitCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentElement;
      if (!parent) return;

      const ctx = canvas.getContext("2d");
      let tempImageData: ImageData | null = null;

      // 이미 그려진 그림이 있다면 임시 저장
      if (ctx && canvas.width > 0 && canvas.height > 0) {
        tempImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      }

      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // 물리적 픽셀 크기 설정 -> 고해상도 보장
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // CSS 표시 크기 설정
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        if (tempImageData) {
          ctx.putImageData(tempImageData, 0, 0);
        } else {
          // 배경을 흰색으로 기본 채움 (YOLO 분석 및 PNG 변환 시 투명도 방지)
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, rect.width, rect.height);
          historyRef.current = [
            ctx.getImageData(0, 0, canvas.width, canvas.height),
          ];
        }
      }
    }, []);

    useEffect(() => {
      resizeAndInitCanvas();
      window.addEventListener("resize", resizeAndInitCanvas);
      return () => window.removeEventListener("resize", resizeAndInitCanvas);
    }, [resizeAndInitCanvas]);

    // Imperative API!!
    useImperativeHandle(ref, () => ({
      undo: () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (historyRef.current.length > 1) {
          historyRef.current.pop();
          const previousState =
            historyRef.current[historyRef.current.length - 1];
          ctx.putImageData(previousState, 0, 0);

          if (strokeListRef.current.length > 0) {
            strokeListRef.current.pop();
          }
        }
      },
      clear: () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, rect.width, rect.height);

        historyRef.current = [
          ctx.getImageData(0, 0, canvas.width, canvas.height),
        ];
        strokeListRef.current = [];
      },
      getImageFile: async (filename = "drawing.png") => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        return new Promise<File | null>((resolve) => {
          canvas.toBlob((blob) => {
            if (!blob) {
              resolve(null);
              return;
            }
            const file = new File([blob], filename, { type: "image/png" });
            resolve(file);
          }, "image/png");
        });
      },
      getStrokes: () => strokeListRef.current,
    }));

    // PointerEvent 기준 좌표 및 필압 측정
    const getPointerDetails = (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0, pressure: 0.5 };

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const pressure =
        e.pressure !== undefined && e.pressure !== 0 ? e.pressure : 0.5;

      return { x, y, pressure };
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.setPointerCapture(e.pointerId);
      isDrawingRef.current = true;

      const { x, y, pressure } = getPointerDetails(e);
      const now = performance.now();

      currentStrokeRef.current = [{ x, y, time: now, pressure }];

      ctx.beginPath();
      ctx.moveTo(x, y);

      if (activeTool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = eraserWidth;
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = selectedColor;
        ctx.lineWidth = lineWidth;
      }
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { x, y, pressure } = getPointerDetails(e);
      const now = performance.now();

      currentStrokeRef.current.push({ x, y, time: now, pressure });

      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current) return;
      isDrawingRef.current = false;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.releasePointerCapture(e.pointerId);
      ctx.closePath();

      // Stroke 기록 저장
      strokeListRef.current.push({
        tool: activeTool,
        color: selectedColor,
        lineWidth: activeTool === "eraser" ? eraserWidth : lineWidth,
        points: [...currentStrokeRef.current],
      });

      // 히스토리 추가
      const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      historyRef.current.push(currentState);
    };

    return (
      <div className="w-full h-full relative select-none touch-none bg-white">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full h-full block cursor-crosshair touch-none"
        />
      </div>
    );
  },
);

Canvas.displayName = "Canvas";

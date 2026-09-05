import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import type {
  CanvasDrawingData,
  DrawingPoint,
  DrawingPointerType,
  DrawingStroke,
} from "../../types/test.type";

const MAX_TOTAL_POINTS = 250_000;
const SAMPLE_INTERVAL_MS = 1000 / 60;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

interface InternalStrokePoint {
  x: number; 
  y: number;
  t: number; 
  pressure: number;
}

interface InternalStroke {
  strokeId: string;
  pointerType: DrawingPointerType;
  lineWidth: number;
  points: InternalStrokePoint[];
}

export interface CanvasRef {
  undo: () => void;
  clear: () => void;
  getImageFile: (filename?: string) => Promise<File | null>;
  getDrawingData: () => CanvasDrawingData;
}

interface CanvasProps {
  selectedColor: string;
  lineWidth?: number;
  onStrokeCountChange?: (count: number) => void;
}

export const Canvas = forwardRef<CanvasRef, CanvasProps>(
  ({ selectedColor, lineWidth = 4, onStrokeCountChange }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDrawingRef = useRef<boolean>(false);
    const activePointerIdRef = useRef<number | null>(null);

    const hasInitializedRef = useRef<boolean>(false);

    const historyRef = useRef<ImageData[]>([]);

    const strokeListRef = useRef<InternalStroke[]>([]);
    const currentStrokeRef = useRef<InternalStrokePoint[]>([]);
    const currentPointerTypeRef = useRef<DrawingPointerType>("unknown");

    const sessionStartRef = useRef<number | null>(null);
    const lastSampleTimeRef = useRef<number>(0);
    const totalPointCountRef = useRef<number>(0);

    const resizeAndInitCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentElement;
      if (!parent) return;

      const ctx = canvas.getContext("2d");
      const isFirstInit = !hasInitializedRef.current;

      let tempImageData: ImageData | null = null;
      if (!isFirstInit && ctx && canvas.width > 0 && canvas.height > 0) {
        tempImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      }

      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        if (tempImageData) {
          ctx.putImageData(tempImageData, 0, 0);
          historyRef.current = [
            ctx.getImageData(0, 0, canvas.width, canvas.height),
          ];
          strokeListRef.current = [];
          onStrokeCountChange?.(0);
        } else {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, rect.width, rect.height);
          historyRef.current = [
            ctx.getImageData(0, 0, canvas.width, canvas.height),
          ];
        }
      }

      hasInitializedRef.current = true;
    }, []);

    useEffect(() => {
      resizeAndInitCanvas();
      window.addEventListener("resize", resizeAndInitCanvas);
      return () => window.removeEventListener("resize", resizeAndInitCanvas);
    }, [resizeAndInitCanvas]);

    useImperativeHandle(ref, () => ({
      undo: () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (historyRef.current.length > 1) {
          historyRef.current.pop();

          if (strokeListRef.current.length > 0) {
            strokeListRef.current.pop();
          }

          const previousState =
            historyRef.current[historyRef.current.length - 1];
          ctx.putImageData(previousState, 0, 0);

          onStrokeCountChange?.(strokeListRef.current.length);
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

        onStrokeCountChange?.(0);
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
      getDrawingData: (): CanvasDrawingData => {
        const canvas = canvasRef.current;
        const rect = canvas?.getBoundingClientRect();
        const width = rect && rect.width > 0 ? rect.width : 1;
        const height = rect && rect.height > 0 ? rect.height : 1;

        const now = performance.now();
        const sessionStart = sessionStartRef.current ?? now;
        const durationMs = Math.max(1, Math.round(now - sessionStart));

        const strokes: DrawingStroke[] = strokeListRef.current.map(
          (stroke) => {
            const distinctPressures = new Set(
              stroke.points.map((p) => p.pressure),
            );
            const isMeasured =
              stroke.pointerType === "pen" && distinctPressures.size > 1;

            const points: DrawingPoint[] = stroke.points.map((p) => {
              const point: DrawingPoint = {
                x: clamp01(p.x / width),
                y: clamp01(p.y / height),
                t_ms: Math.round(p.t - sessionStart),
              };
              if (isMeasured) {
                point.pressure = p.pressure;
              }
              return point;
            });

            return {
              stroke_id: stroke.strokeId,
              pointer_type: stroke.pointerType,
              pressure_source: isMeasured ? "measured" : "unavailable",
              brush_width_px: stroke.lineWidth,
              points,
            };
          },
        );

        return {
          schema_version: 1,
          canvas: {
            width: canvas?.width ?? 0,
            height: canvas?.height ?? 0,
          },
          duration_ms: durationMs,
          strokes,
        };
      },
    }));

    const getPointerDetails = (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0, pressure: 0 };

      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        pressure: e.pressure,
      };
    };

    const toDrawingPointerType = (pointerType: string): DrawingPointerType => {
      if (pointerType === "pen" || pointerType === "touch" || pointerType === "mouse") {
        return pointerType;
      }
      return "unknown";
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!e.isPrimary) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.setPointerCapture(e.pointerId);
      activePointerIdRef.current = e.pointerId;
      isDrawingRef.current = true;

      if (sessionStartRef.current === null) {
        sessionStartRef.current = performance.now();
      }

      const { x, y, pressure } = getPointerDetails(e);
      const now = performance.now();

      currentPointerTypeRef.current = toDrawingPointerType(e.pointerType);
      currentStrokeRef.current = [{ x, y, t: now, pressure }];
      lastSampleTimeRef.current = now;
      totalPointCountRef.current += 1;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = lineWidth;
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current || e.pointerId !== activePointerIdRef.current) {
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { x, y, pressure } = getPointerDetails(e);

      ctx.lineTo(x, y);
      ctx.stroke();

      const now = performance.now();
      if (
        now - lastSampleTimeRef.current >= SAMPLE_INTERVAL_MS &&
        totalPointCountRef.current < MAX_TOTAL_POINTS
      ) {
        currentStrokeRef.current.push({ x, y, t: now, pressure });
        lastSampleTimeRef.current = now;
        totalPointCountRef.current += 1;
      }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current || e.pointerId !== activePointerIdRef.current) {
        return;
      }
      isDrawingRef.current = false;
      activePointerIdRef.current = null;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.releasePointerCapture(e.pointerId);
      ctx.closePath();
      
      strokeListRef.current.push({
        strokeId: `stroke-${strokeListRef.current.length + 1}`,
        pointerType: currentPointerTypeRef.current,
        lineWidth,
        points: [...currentStrokeRef.current],
      });

      const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      historyRef.current.push(currentState);

      onStrokeCountChange?.(strokeListRef.current.length);
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

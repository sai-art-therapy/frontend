import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import imagecheckIcon from "../../assets/icons/test/imagecheck.svg";
import { useAppMutation, useAppQuery } from "../../hooks/apiHooks";
import { analyzeTest } from "../../apis/test/test";
import { getChildren } from "../../api/mypage";
import type { AnalyzeTestResponse } from "../../types/test.type";

const TestLoadingStep = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const testId = location.state?.testId;
  const childId = location.state?.childId;
  const imageFile = location.state?.imageFile;
  const imageUrl = location.state?.imageUrl;
  const drawingSource = location.state?.drawingSource;

  const [progress, setProgress] = useState(0);
  const [childName, setChildName] = useState("아이");

  const hasStartedRef = useRef(false);

  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const startFakeProgress = () => {
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        const next = prev + (90 - prev) * 0.1;
        return next >= 89.5 ? 90 : next;
      });
    }, 300);
  };

  const stopFakeProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const { data: childrenList } = useAppQuery(["children"], getChildren, {
    enabled: !!childId,
  });

  const { mutate: startAnalyze } = useAppMutation<AnalyzeTestResponse, number>(
    (tId) => analyzeTest(tId),
    {
      onSuccess: () => {
        stopFakeProgress();
        setProgress(100);

        const nextPath =
          drawingSource === "canvas"
            ? "/test-question-intro-step"
            : "/test-time-input-step";

        setTimeout(() => {
          navigate(nextPath, {
            state: {
              testId,
              childId,
              childName,
              imageFile,
              imageUrl,
            },
          });
        }, 800);
      },
      onError: (error) => {
        stopFakeProgress();
        console.error("분석 요청 실패:", error);
        alert("이미지 분석을 시작하지 못했습니다. 다시 시도해 주세요.");
        navigate(-1);
      },
    },
  );

  useEffect(() => {
    if (!testId) {
      alert("검사 정보가 유효하지 않습니다.");
      navigate("/test");
      return;
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    startAnalyze(Number(testId));
    startFakeProgress();

    return () => stopFakeProgress();
  }, [testId]);

  useEffect(() => {
    if (childrenList && childId) {
      const targetChild = childrenList.find(
        (child) => child.child_id === Number(childId),
      );
      if (targetChild) {
        setChildName(targetChild.name);
      }
    }
  }, [childrenList, childId]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans">
      <style>
        {`
          @keyframes scanLine {
            0% { top: 0px; }
            50% { top: calc(100% - 2px); }
            100% { top: 0px; }
          }
          .animate-scan {
            animation: scanLine 2s ease-in-out infinite;
          }
        `}
      </style>

      <div className="mt-[195px] flex flex-col items-center">
        {/* 애니메이션 박스 */}
        <div className="relative flex aspect-square w-[160px] flex-col items-center justify-center overflow-hidden rounded-md bg-main-100 py-[30px]">
          <img
            src={imagecheckIcon}
            alt="그림 확인"
            className="h-[100px] w-[100px]"
          />
          {/* 주황색 스캔 선 */}
          <div className="animate-scan absolute left-0 h-[2px] w-[160px] bg-main-600"></div>
        </div>

        <h1 className="mt-[48px] line-clamp-2 text-center text-[24px] font-bold leading-[34px] tracking-[0.36px] text-grey-900 whitespace-pre-line">
          {childName}의 그림을{"\n"}꼼꼼히 살펴보고 있어요
        </h1>

        <p className="mt-[8px] text-center text-subheadline text-grey-600">
          약 30초 정도 걸려요
        </p>

        {/* 진행바 */}
        <div className="mt-[48px] h-[8px] w-[280px] overflow-hidden rounded-full bg-grey-200">
          <div
            className="h-full bg-main-500 transition-all"
            style={{
              width: `${progress}%`,
              transitionDuration: progress === 100 ? "500ms" : "300ms",
              transitionTimingFunction:
                progress === 100 ? "ease-out" : "linear",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TestLoadingStep;

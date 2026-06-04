import { useState, useEffect, useRef } from "react"; // 1. useRef 추가
import { useNavigate, useLocation } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";
import { useAppQuery } from "../../hooks/apiHooks";
import {
  getReportDetail,
  getReports,
  generateReport,
} from "../../apis/test/test";
import type { ReportListItem } from "../../types/test.type";

import returnIcon from "../../assets/icons/common/return.svg";
import referIcon from "../../assets/icons/test/refer.svg";
import heartDocumentIcon from "../../assets/icons/test/heartdocument.svg";
import alertIcon from "../../assets/icons/test/alert.svg";
import personIcon from "../../assets/icons/test/person.svg";
import questionmarkBalloonIcon from "../../assets/icons/test/questionmarkballoon.svg";
import shareIcon from "../../assets/icons/test/share.svg";
import saveIcon from "../../assets/icons/test/save.svg";

const TestResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"집" | "사람" | "나무">("집");

  const { reportId: stateReportId, testId } = location.state ?? {};

  const [resolvedReportId, setResolvedReportId] = useState<number | undefined>(
    stateReportId ? Number(stateReportId) : undefined,
  );
  const [isTimedOut, setIsTimedOut] = useState(false);

  const hasRequestedReport = useRef(false);

  useEffect(() => {
    if (testId && !resolvedReportId && !hasRequestedReport.current) {
      hasRequestedReport.current = true;

      generateReport(Number(testId))
        .then(() => console.log("🚀 [성공] 백엔드에 AI 리포트 생성 요청 완료!"))
        .catch((err) => console.error("❌ [실패] 리포트 생성 요청 에러:", err));
    }
  }, [testId, resolvedReportId]);

  const needsPolling = !resolvedReportId && !!testId && !isTimedOut;

  const { data: reportsList } = useAppQuery<ReportListItem[]>(
    ["reports-polling", testId],
    getReports,
    {
      enabled: needsPolling,
      staleTime: 0,
      refetchInterval: needsPolling ? 2000 : false,
    },
  );

  useEffect(() => {
    if (!resolvedReportId && Array.isArray(reportsList)) {
      const targetTestId = Number(testId);

      console.log("=== [폴링 디버깅] ===");
      console.log("찾고 있는 현재 Test ID:", targetTestId);
      console.log("백엔드 리포트 목록 데이터:", reportsList);

      const match = reportsList.find((r) => Number(r.test_id) === targetTestId);

      if (match?.report_id) {
        console.log(
          "🎉 일치하는 리포트를 찾았습니다! Report ID:",
          match.report_id,
        );
        setResolvedReportId(match.report_id);
      } else {
        console.log(
          "⏳ 아직 목록에 현재 Test ID와 매칭되는 리포트가 없습니다. 계속 대기 중...",
        );
      }
    }
  }, [reportsList, resolvedReportId, testId]);

  useEffect(() => {
    if (!resolvedReportId && !!testId) {
      const timer = setTimeout(() => {
        console.error("❌ 90초 대기 시간 초과: AI 리포트 생성 타임아웃");
        setIsTimedOut(true);
      }, 90000); // 90000ms = 90초
      return () => clearTimeout(timer);
    }
  }, [resolvedReportId, testId]);

  const {
    data: reportData,
    isLoading: isDetailLoading,
    isError,
    error,
  } = useAppQuery(
    ["reportDetail", resolvedReportId],
    async () => {
      if (!resolvedReportId) throw new Error("리포트 ID를 찾을 수 없습니다.");
      return getReportDetail(resolvedReportId);
    },
    {
      enabled: !!resolvedReportId,
    },
  );

  useEffect(() => {
    if (isError && error) {
      console.error("리포트 상세 로드 에러:", error);
    }
  }, [isError, error]);

  const getTabKey = (
    tab: "집" | "사람" | "나무",
  ): "house" | "person" | "tree" => {
    if (tab === "집") return "house";
    if (tab === "사람") return "person";
    return "tree";
  };

  if (needsPolling) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white font-sans text-grey-600">
        <div className="flex flex-col items-center gap-4 px-[24px] text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-main-500 border-t-transparent" />
          <p className="text-subheadline font-medium whitespace-pre-line">
            {
              "AI가 심리 분석 리포트를 생성하고 있습니다.\n잠시만 기다려주세요...\n(최대 1~2분이 소요될 수 있습니다)"
            }
          </p>
        </div>
      </div>
    );
  }

  if (!resolvedReportId) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white font-sans">
        <div className="flex flex-col items-center gap-4 px-[24px] text-center">
          <p className="text-[17px] font-semibold text-grey-900">
            리포트 정보를 불러올 수 없습니다.
          </p>
          <p className="text-[13px] text-grey-400">
            검사 결과가 아직 준비 중이거나 데이터를 찾을 수 없습니다.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded-[8px] bg-main-500 px-[20px] py-[10px] text-[14px] font-semibold text-white"
          >
            뒤로가기
          </button>
        </div>
      </div>
    );
  }

  if (isDetailLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white font-sans text-grey-600">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-main-500 border-t-transparent" />
          <p className="text-subheadline font-medium">
            아이의 마음 리포트를 불러오고 있습니다...
          </p>
        </div>
      </div>
    );
  }

  const reportAny = reportData as any;

  const childName = reportData?.child?.name || "아이";
  const age = reportData?.child?.age ? `만 ${reportData.child.age}세` : "";
  const gender =
    reportData?.child?.gender === "male"
      ? "남아"
      : reportData?.child?.gender === "female"
        ? "여아"
        : "";

  const rawDate = reportData?.test?.test_date;
  const testDate = rawDate
    ? `${rawDate.split("T")[0].replace(/-/g, ".")} 검사`
    : reportData?.test?.test_date_label || "";

  const summaryText =
    reportData?.summary?.one_line_summary ||
    "그림 전반에 안정감과 현실 접촉이 잘 표현되었습니다.";

  const currentKey = getTabKey(activeTab);
  const activeTabContent = reportData?.tabs?.[currentKey];

  const serverBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const fallbackImageUrl = "https://placehold.co/370x200?text=No+Image";

  const rawImgPath =
    reportAny?.analysis?.yolo_result_json?.result_image_paths?.[currentKey] ||
    reportData?.images?.result_image_path ||
    reportData?.test?.result_image_path;

  const imageUrl =
    serverBaseUrl && rawImgPath
      ? `${serverBaseUrl}/${rawImgPath}`
      : fallbackImageUrl;

  const recommendations =
    reportData?.recommendations && reportData.recommendations.length > 0
      ? reportData.recommendations
      : reportAny?.raw_report?.report_json?.recommendations || [];

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans pb-[40px]">
      {/* 헤더 영역 */}
      <div className="flex h-[68px] w-full items-center justify-start gap-[16px] px-[24px] py-[20px]">
        <img
          src={returnIcon}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
          className="h-[14px] w-[14px] cursor-pointer"
        />
        <h1 className="text-e-title-3 text-grey-900">검사 결과</h1>
      </div>

      <main className="flex flex-col px-[24px]">
        {/* 경고 박스 */}
        <div className="mt-[4px] flex w-full items-center gap-[10px] rounded-[8px] bg-warning-100 p-[8px]">
          <img src={referIcon} alt="참고" className="h-[24px] w-[24px]" />
          <p className="text-[13px] font-normal leading-[18px] tracking-[-0.08px] text-grey-900">
            {reportData?.safety_notice ||
              "본 결과는 참고용이며 전문 진단을 대체하지 않습니다."}
          </p>
        </div>

        {/* 유저 타이틀 및 태그 */}
        <div className="mt-[16px] flex items-start gap-[16px]">
          <img
            src={heartDocumentIcon}
            alt="마음 이야기 문서"
            className="h-[60px] w-[60px] shrink-0"
          />
          <div className="flex flex-col gap-[8px]">
            <h2 className="text-[20px] font-bold leading-[25px] tracking-[0.38px] text-grey-900">
              {childName}의 마음 이야기
            </h2>
            <div className="flex flex-wrap items-center gap-[8px]">
              {age && (
                <span className="flex items-center justify-center rounded-[4px] bg-main-100 px-[6px] py-[4px] text-[12px] font-semibold leading-[16px] text-main-500">
                  {age}
                </span>
              )}
              {gender && (
                <span className="flex items-center justify-center rounded-[4px] bg-main-100 px-[6px] py-[4px] text-[12px] font-semibold leading-[16px] text-main-500">
                  {gender}
                </span>
              )}
              {testDate && (
                <span className="flex items-center justify-center rounded-[4px] bg-main-100 px-[6px] py-[4px] text-[12px] font-semibold leading-[16px] text-main-500">
                  {testDate}
                </span>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 회색 구분선 */}
      <div className="mt-[16px] h-[13px] w-full bg-grey-100" />

      <main className="flex flex-col px-[24px]">
        {/* 종합 요약 */}
        <h3 className="mt-[16px] text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-grey-900">
          종합 요약을 해드릴게요
        </h3>

        <div className="mt-[16px] flex w-full items-start gap-[8px] rounded-[12px] bg-grey-50 px-[8px] py-[16px]">
          <img
            src={alertIcon}
            alt="알림"
            className="h-[24px] w-[24px] shrink-0"
          />
          <p className="whitespace-pre-wrap text-[15px] font-normal leading-[20px] tracking-[-0.24px] text-grey-900">
            {summaryText}
          </p>
        </div>

        {/* 상세 분석 탭 영역 */}
        <h3 className="mt-[32px] text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-grey-900">
          그림 속 요소를 하나씩 살펴봤어요
        </h3>

        <div className="mt-[16px] flex h-[40px] w-full items-center rounded-full bg-grey-100 p-[4px]">
          {(["집", "사람", "나무"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-1 items-center justify-center gap-[4px] rounded-full px-[16px] py-[8px] text-[13px] font-semibold leading-[18px] tracking-[-0.08px] transition-colors ${
                activeTab === tab ? "bg-white text-grey-800" : "text-grey-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 그림 이미지 영역 (YOLO 결과 이미지 - 바운딩박스 포함) */}
        <div className="relative mt-[8px] flex h-[200px] w-full items-center justify-center overflow-hidden rounded-[12px] bg-grey-200">
          <img
            src={imageUrl}
            alt={`${activeTab} 분석 AI 이미지`}
            className="h-full w-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImageUrl;
            }}
          />
        </div>

        {/* 분석 소견 카드 */}
        <div className="mt-[8px] flex w-full flex-col gap-[8px] rounded-[12px] border border-grey-200 bg-white p-[12px]">
          <div className="flex w-full items-start gap-[16px]">
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[8px] bg-error-100">
              <span className="text-[20px]">
                {activeTab === "집" ? "🏠" : activeTab === "사람" ? "👤" : "🌳"}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-0">
              <div className="flex w-full items-center justify-between">
                <span className="text-[15px] font-semibold leading-[20px] tracking-[-0.24px] text-grey-900">
                  {activeTab === "집"
                    ? "정서・가족 인식"
                    : activeTab === "사람"
                      ? "자아개념・사회성"
                      : "내적생동감・성장"}
                </span>
                <div className="flex items-center justify-center rounded-[4px] bg-success-100 px-[6px] py-[4px]">
                  <span className="text-[12px] font-semibold leading-[16px] text-success-500">
                    {activeTabContent?.status || "보통"}
                  </span>
                </div>
              </div>
              <span className="text-[12px] font-normal leading-[16px] text-grey-600">
                {activeTab} 그림 기반 소견
              </span>
            </div>
          </div>

          <p className="mt-[8px] whitespace-pre-wrap text-[13px] font-normal leading-[18px] tracking-[-0.08px] text-black">
            {activeTabContent?.interpretation || "해석 정보가 없습니다."}
          </p>

          {/* 태그 리스트 */}
          {activeTabContent?.tags && activeTabContent.tags.length > 0 && (
            <div className="mt-[8px] flex flex-wrap items-center gap-[8px]">
              {activeTabContent.tags.map((tag, idx) => (
                <div
                  key={`tag-${idx}`}
                  className="flex items-center justify-center rounded-[4px] border border-sub-200 bg-sub-100 px-[6px] py-[4px]"
                >
                  <span className="text-[12px] font-semibold leading-[16px] text-sub-500">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 관찰 내용 */}
          {activeTabContent?.observations &&
            activeTabContent.observations.length > 0 && (
              <div className="mt-[8px] flex flex-col gap-[4px]">
                {activeTabContent.observations.map((obs, idx) => (
                  <p
                    key={`obs-${idx}`}
                    className="text-[12px] font-normal leading-[16px] text-grey-600"
                  >
                    • {obs}
                  </p>
                ))}
              </div>
            )}

          {/* 긍정 노트 */}
          {activeTabContent?.positive_note && (
            <div className="mt-[8px] rounded-[8px] bg-main-50 px-[10px] py-[8px]">
              <p className="text-[12px] font-normal leading-[16px] text-main-600">
                💡 {activeTabContent.positive_note}
              </p>
            </div>
          )}
        </div>

        {/* 추천 가이드 솔루션 활동 */}
        <h3 className="mt-[32px] text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-grey-900">
          이런 활동을 해보세요
        </h3>

        <div className="mt-[16px] flex w-full flex-col gap-[8px]">
          {recommendations.length > 0 ? (
            recommendations.map(
              (item: { title: string; description: string }, idx: number) => (
                <div
                  key={`recom-${idx}`}
                  className="flex w-full items-start gap-[12px] rounded-[12px] bg-grey-50 p-[12px]"
                >
                  <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-sub-100">
                    <span className="text-center text-[14px] font-semibold text-sub-500">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <h4 className="text-[15px] font-semibold leading-[20px] tracking-[-0.24px] text-grey-900">
                      {item.title}
                    </h4>
                    <p className="whitespace-pre-wrap text-[13px] font-normal leading-[18px] tracking-[-0.08px] text-grey-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ),
            )
          ) : (
            <p className="text-[13px] text-grey-400">
              추천 가이드 활동이 아직 수립되지 않았습니다.
            </p>
          )}
        </div>

        {/* 전문 상담 권장 알림 카드 */}
        <div className="mt-[8px] flex w-full flex-col items-start gap-[10px] rounded-[12px] bg-warning-100 p-[12px]">
          <div className="flex items-center gap-[8px]">
            <img src={personIcon} alt="전문가" className="h-[24px] w-[24px]" />
            <span className="text-[15px] font-semibold leading-[20px] tracking-[-0.24px] text-grey-900">
              전문 상담 고려 안내
            </span>
          </div>
          <p className="text-[13px] font-normal leading-[18px] tracking-[-0.08px] text-grey-900">
            결과 소견 내용이 염려되거나 일상 행동 패턴에 지속적인 주의 신호가
            발견된다면 아동 발달 및 임상 심리 전문가와 내방 상담을 권장합니다.
          </p>
        </div>

        {/* AI 상담 대화 기능 유도 박스 */}
        <div className="mt-[32px] flex w-full flex-col items-center justify-center gap-[16px] rounded-[12px] border border-main-200 bg-white p-[16px]">
          <div className="flex items-center gap-[8px]">
            <img
              src={questionmarkBalloonIcon}
              alt="질문"
              className="h-[24px] w-[24px]"
            />
            <span className="text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-grey-900">
              아이에 대한 궁금한 점이 있다면
            </span>
          </div>

          <ActionButton
            variant="lightOrange"
            size="md"
            className="w-full"
            showIcon={false}
            onClick={() =>
              navigate("/ai-chat", { state: { reportId: resolvedReportId } })
            }
          >
            AI 상담사와 대화하기
          </ActionButton>
        </div>

        <div className="mb-[40px] mt-[16px] flex w-full items-center gap-[14px]">
          <button className="flex h-[42px] flex-1 cursor-pointer items-center justify-center gap-[6px] rounded-[8px] bg-sub-100 transition-colors active:bg-sub-200">
            <img src={shareIcon} alt="공유" className="h-[24px] w-[24px]" />
            <span className="text-[15px] font-semibold leading-[20px] tracking-[-0.24px] text-sub-500">
              공유하기
            </span>
          </button>

          <button className="flex h-[42px] flex-1 cursor-pointer items-center justify-center gap-[6px] rounded-[8px] bg-sub-100 transition-colors active:bg-sub-200">
            <img src={saveIcon} alt="PDF 저장" className="h-[24px] w-[24px]" />
            <span className="text-[15px] font-semibold leading-[20px] tracking-[-0.24px] text-sub-500">
              PDF 저장하기
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default TestResult;

import React from "react";

interface ReportItem {
  name: string;
  date: string;
  count: number;
}

interface ReportBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  reports: ReportItem[];
  onSelectReport: (report: ReportItem) => void;
}

export const ReportBottomSheet: React.FC<ReportBottomSheetProps> = ({
  isOpen,
  onClose,
  reports,
  onSelectReport,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-50 transition-opacity max-w-[402px] mx-auto"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[402px] p-[32px_16px_48px_16px] flex flex-col items-start gap-[24px] rounded-t-xl bg-white z-50 animate-slide-up shadow-xl">
        <h3 className="text-grey-900 text-e-title-2 font-sans">
          대화할 리포트 변경
        </h3>

        <div className="flex flex-col w-full gap-[24px]">
          {reports.map((report, idx) => (
            <button
              key={idx}
              onClick={() => onSelectReport(report)}
              className="w-full cursor-pointer text-left py-1 text-grey-900 text-body-1 font-sans hover:text-main-500 transition-colors"
            >
              {report.name} ･ {report.date} ･ {report.count}번째 검사
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

import React from "react";
import type { Report } from "../../api/home";
import boyIcon from "../../assets/icons/test/boy.png";
import chevronIcon from "../../assets/icons/common/chevron.svg";

interface ReportItemProps {
  report: Report;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

const ReportItem: React.FC<ReportItemProps> = ({ report }) => {
  return (
    <div className="flex w-[338px] py-[12px] justify-between items-center bg-white cursor-pointer hover:opacity-80 transition-opacity">
      <div className="flex items-center gap-[8px]">
        <div className="flex w-[40px] h-[40px] justify-center items-center rounded-full bg-grey-50 overflow-hidden">
          <img
            src={boyIcon}
            alt="프로필"
            className="w-[22px] h-[22px] object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-black text-e-subheadline">{report.child_name}</span>
          <div className="flex items-center mt-[2px] text-grey-700 text-footnote">
            <span>{formatDate(report.tested_at)}</span>
            {report.test_number !== undefined && (
              <>
                <span className="mx-[2px]">・</span>
                <span>{report.test_number} 검사</span>
              </>
            )}
          </div>
        </div>
      </div>

      <img src={chevronIcon} alt="상세 이동" className="w-icon-sm h-icon-sm" />
    </div>
  );
};

export default ReportItem;

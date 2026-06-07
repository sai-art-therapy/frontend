import React from "react";
import { useNavigate } from "react-router-dom";
import type { Report } from "../../api/home";
import boyIcon from "../../assets/icons/test/boy.png";
import chevronIcon from "../../assets/icons/common/chevron.svg";

interface ReportItemProps {
  report: Report;
}

const ReportItem: React.FC<ReportItemProps> = ({ report }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/chat/report/${report.test_id}`)}
      className="flex w-[338px] py-[12px] justify-between items-center bg-white cursor-pointer hover:opacity-80 transition-opacity"
    >
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
            <span>{report.test_date_label}</span>
            <span className="mx-[2px]">・</span>
            <span>{report.test_order_label}</span>
          </div>
        </div>
      </div>

      <img src={chevronIcon} alt="상세 이동" className="w-icon-sm h-icon-sm" />
    </div>
  );
};

export default ReportItem;

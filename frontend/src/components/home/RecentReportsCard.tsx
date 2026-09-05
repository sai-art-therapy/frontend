import React from "react";
import type { Report } from "../../api/home";
import calendarIcon from "../../assets/icons/home/calendar.svg";
import ReportItem from "./ReportItem";

interface RecentReportsCardProps {
  title: string;
  reports: Report[];
}

const RecentReportsCard: React.FC<RecentReportsCardProps> = ({
  title,
  reports,
}) => {
  return (
    <div className="flex w-[370px] p-[16px_16px_8px_16px] flex-col justify-center items-start rounded-md bg-white">
      <div className="flex items-center mb-[4px]">
        <img src={calendarIcon} alt="달력" className="w-icon-sm h-icon-sm" />
        <h3
          className="ml-[8px] text-black text-e-body-1"
          style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
        >
          {title}
        </h3>
      </div>

      <div className="flex flex-col w-full mt-[4px]">
        {reports.map((report, idx) => (
          <React.Fragment key={report.test_id}>
            <ReportItem report={report} />
            {idx < reports.length - 1 && (
              <div className="w-[338px] h-[1px] bg-grey-200" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RecentReportsCard;

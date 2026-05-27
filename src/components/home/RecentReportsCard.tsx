import React from "react";
import calendarIcon from "../../assets/icons/home/calendar.svg";
import ReportItem, { type UserReportInfo } from "./ReportItem";

interface RecentReportsCardProps {
  userInfo: UserReportInfo;
}

const RecentReportsCard: React.FC<RecentReportsCardProps> = ({ userInfo }) => {
  return (
    <div className="flex w-[370px] p-[16px_16px_8px_16px] flex-col justify-center items-start rounded-md bg-white">
      <div className="flex items-center mb-[4px]">
        <img src={calendarIcon} alt="달력" className="w-icon-sm h-icon-sm" />
        <h3
          className="ml-[8px] text-black text-e-body-1"
          style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
        >
          최근 검사 리포트를 확인해보세요
        </h3>
      </div>

      <div className="flex flex-col w-full mt-[4px]">
        {/* 첫 번째 리포트 아이템 */}
        <ReportItem userInfo={userInfo} />

        <div className="w-[338px] h-[1px] bg-grey-200"></div>

        {/* 두 번째 리포트 아이템 */}
        <ReportItem userInfo={userInfo} />
      </div>
    </div>
  );
};

export default RecentReportsCard;

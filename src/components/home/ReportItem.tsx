import React from "react";
import boyIcon from "../../assets/icons/test/boy.png";
import chevronIcon from "../../assets/icons/common/chevron.svg";

export interface UserReportInfo {
  name?: string;
  date: string;
  testCount: number;
}

interface ReportItemProps {
  userInfo: UserReportInfo;
}

const ReportItem: React.FC<ReportItemProps> = ({ userInfo }) => {
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
          <span className="text-black text-e-subheadline">
            {userInfo?.name || "이름"}
          </span>
          <div className="flex items-center mt-[2px] text-grey-700 text-footnote">
            <span>{userInfo.date}</span>
            <span className="mx-[2px]">・</span>
            <span>{userInfo.testCount} 검사</span>
          </div>
        </div>
      </div>

      <img src={chevronIcon} alt="상세 이동" className="w-icon-sm h-icon-sm" />
    </div>
  );
};

export default ReportItem;

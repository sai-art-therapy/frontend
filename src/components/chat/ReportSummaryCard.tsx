import React from "react";
import boyImage from "../../assets/icons/test/boy.png";
import chevronIcon from "../../assets/icons/common/chevron.svg";

interface ReportSummaryCardProps {
  name: string;
  date: string;
  count: number;
  onChangeClick: () => void;
}

export const ReportSummaryCard: React.FC<ReportSummaryCardProps> = ({
  name,
  date,
  count,
  onChangeClick,
}) => {
  return (
    <div className="mt-[8px] flex w-[370px] max-w-full p-[12px] flex-col items-start gap-[12px] rounded-md bg-grey-50">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <div className="flex h-[40px] w-[40px] p-[9.333px_8.667px_9.667px_9.333px] justify-center items-center rounded-full bg-white shrink-0">
            <img
              src={boyImage}
              alt="아이 프로필"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="ml-[8px] flex flex-col font-sans">
            <span className="text-e-subheadline text-black">{name}</span>
            <div className="flex items-center text-footnote text-black">
              <span>{date}</span>
              <span className="mx-[2px]">・</span>
              <span>{count}번째 검사</span>
            </div>
          </div>
        </div>

        <button
          onClick={onChangeClick}
          className="flex cursor-pointer h-[30px] px-[8px] py-[6px] justify-center items-center gap-[6px] rounded-[6px] bg-grey-800 text-white font-sans text-e-footnote"
        >
          변경
        </button>
      </div>

      <div className="w-[346px] max-w-full h-[1px] bg-grey-200" />

      <div className="flex w-full items-center justify-between cursor-pointer font-sans">
        <span className="text-subheadline text-grey-700">
          검사 결과 전체보기
        </span>
        <img
          src={chevronIcon}
          alt="이동"
          className="w-[24px] h-[24px] shrink-0"
        />
      </div>
    </div>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";

import temporaryIcon from "../../assets/icons/Mypage/temporary.svg";

interface PreparationPageProps {
  title: string;
  message: string;
}

const PreparationPage: React.FC<PreparationPageProps> = ({
  title,
  message,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans pb-[80px]">
      <div className="flex w-full items-center justify-between px-[24px] pb-[19px] pt-[21px]">
        <span className="text-subheadline font-semibold text-black">9:41</span>
        <div className="flex items-center gap-[5px]">
          <div className="h-[10px] w-[17px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[15px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[24px] rounded-xs bg-black"></div>
        </div>
      </div>

      <TopBar title={title} variant="back" onBackClick={() => navigate(-1)} />

      <main className="flex w-full flex-col items-center">
        <img
          src={temporaryIcon}
          alt="준비 중 아이콘"
          className="mt-[230px] h-[100px] w-[100px]"
        />

        <p
          className="mt-[28px] text-[20px] font-bold leading-[25px] tracking-[0.38px] text-[#8B97A7]"
          style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
        >
          {message}
        </p>
      </main>
    </div>
  );
};

export default PreparationPage;

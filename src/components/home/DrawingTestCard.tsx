import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";
import heartSearchIcon from "../../assets/icons/home/heart-search.svg";
import StepGuide from "./StepGuide";

interface DrawingTestCardProps {
  hasHistory: boolean;
  title: string;
  subtitle: string;
  buttonText: string;
  childId?: number | null;
}

const DrawingTestCard: React.FC<DrawingTestCardProps> = ({
  hasHistory,
  title,
  subtitle,
  buttonText,
  childId,
}) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (!childId) {
      alert(
        "등록된 자녀 정보가 없습니다. 마이페이지에서 자녀를 먼저 등록해 주세요.",
      );
      return;
    }

    navigate("/test-start", {
      state: { childId: childId },
    });
  };

  return (
    <div className="flex w-[370px] p-side flex-col justify-center items-start rounded-md bg-white mb-side">
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col">
          <span
            className="text-grey-600 text-subheadline mb-[5px]"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            {subtitle}
          </span>
          <h2
            className="text-black text-e-title-3"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            {title}
          </h2>
        </div>
        <img
          src={heartSearchIcon}
          alt="하트 검색"
          className="w-icon-lg h-icon-lg object-contain"
        />
      </div>

      {!hasHistory && <StepGuide />}

      <div className={`${hasHistory ? "mt-[20px]" : "mt-0"} w-full`}>
        <ActionButton
          variant="lightOrange"
          size="md"
          showIcon={false}
          className="w-full bg-main-100 rounded-sm"
          onClick={handleStartClick}
        >
          <span className="text-main-500 text-e-subheadline">{buttonText}</span>
        </ActionButton>
      </div>
    </div>
  );
};

export default DrawingTestCard;

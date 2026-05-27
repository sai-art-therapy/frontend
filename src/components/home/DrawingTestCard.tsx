import { ActionButton } from "../../components/common/ActionButton";
import heartSearchIcon from "../../assets/icons/home/heart-search.svg";
import StepGuide from "./StepGuide";

const DrawingTestCard = ({ hasHistory }) => {
  return (
    <div className="flex w-[370px] p-side flex-col justify-center items-start rounded-md bg-white mb-side">
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col">
          <span
            className="text-grey-600 text-subheadline mb-[5px]"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            HTP 검사로 아이의 마음을 들여다봐요
          </span>
          <h2
            className="text-black text-e-title-3"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            그림 속 마음 이야기
          </h2>
        </div>
        <img
          src={heartSearchIcon}
          alt="하트 검색"
          className="w-icon-lg h-icon-lg object-contain"
        />
      </div>

      {/* 분기 처리 - 검사 이력이 없을 때만 스텝 뷰 표시됨 */}
      {!hasHistory && <StepGuide />}

      {/* 시작 버튼 */}
      <div className={`${hasHistory ? "mt-[20px]" : "mt-0"} w-full`}>
        <ActionButton
          variant="lightOrange"
          size="md"
          showIcon={false}
          className="w-full bg-main-100 rounded-sm"
        >
          <span className="text-main-500 text-e-subheadline">
            검사 시작하기
          </span>
        </ActionButton>
      </div>
    </div>
  );
};

export default DrawingTestCard;

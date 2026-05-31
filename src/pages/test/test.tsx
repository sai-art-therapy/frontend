import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/common/ActionButton";
import { FloatingButton } from "../../components/common/FloatingButton";

import lovelyIcon from "../../assets/icons/test/lovely.svg";
import clipboardCloseIcon from "../../assets/icons/test/clipboard-close.svg";

import { useAppQuery } from "../../hooks/apiHooks";
import { getChildren } from "../../api/mypage";

const Test = () => {
  const navigate = useNavigate();

  const { data: children } = useAppQuery(["children"], getChildren);

  const handleStartClick = () => {
    if (!children || children.length === 0) {
      alert("등록된 자녀가 없습니다. 자녀를 먼저 등록해 주세요.");
      return;
    }

    navigate("/test-start", {
      state: { childId: children[0].child_id },
    });
  };

  return (
    <div className="w-full bg-white font-sans relative">
      <div className="flex h-[68px] w-full items-center gap-[103px] px-side py-[20px]">
        <h1 className="text-e-title-2 text-grey-900">심리 검사</h1>
      </div>

      <main className="px-side">
        <div className="flex flex-col items-start justify-center gap-side rounded-md border border-grey-200 bg-white p-side">
          <div className="flex items-start gap-side">
            <img
              src={lovelyIcon}
              alt="미술 심리 검사"
              className="h-icon-lg w-icon-lg shrink-0"
            />
            <div className="flex flex-col">
              <h2 className="text-e-body-1 text-black">미술 심리 검사</h2>
              <p className="mt-[8px] text-footnote text-grey-600">
                안내에 따라 검사를 진행해 보세요. AI가 결과를 분석해 우리
                아이에게 꼭 맞는 육아법을 추천해 드려요.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-[10px]">
            <span className="flex items-center justify-center rounded-xs bg-main-100 px-[6px] py-[4px] text-e-footnote text-main-500">
              HTP 검사
            </span>
            <span className="flex items-center justify-center rounded-xs bg-main-100 px-[6px] py-[4px] text-e-footnote text-main-500">
              AI분석
            </span>
            <span className="flex items-center justify-center rounded-xs bg-main-100 px-[6px] py-[4px] text-e-footnote text-main-500">
              검사결과 기반 챗봇
            </span>
          </div>

          <ActionButton
            variant="darkGrey"
            size="md"
            showIcon={false}
            className="w-full"
            onClick={handleStartClick}
          >
            시작하기
          </ActionButton>
        </div>
      </main>

      <div className="mt-[24px] h-[11px] w-full bg-grey-100"></div>

      <section className="flex flex-col bg-white pb-safe-bottom pt-[24px]">
        <h3 className="ml-side text-e-body-1 text-black">최근 검사 결과</h3>
        <div className="mx-side mt-side flex h-[254px] flex-col items-center justify-center gap-[10px] rounded-md bg-grey-50 px-side py-[24px]">
          <img
            src={clipboardCloseIcon}
            alt="진행한 검사 없음"
            className="h-icon-lg w-icon-lg"
          />
          <p className="text-center text-footnote text-grey-600">
            아직 진행한 검사가 없어요.
            <br />
            검사를 진행하고 리포트를 받아보세요!
          </p>
        </div>
      </section>

      <FloatingButton onClick={() => console.log("플로팅 버튼 클릭")} />
    </div>
  );
};

export default Test;

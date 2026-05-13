import React from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";

import boyImg from "../../assets/icons/test/boy.png";
import pencilIcon from "../../assets/icons/Mypage/pencil.svg";
import nextIcon from "../../assets/icons/Mypage/next.svg";
import mypagePlusIcon from "../../assets/icons/Mypage/mypageplus.svg";
import guideIcon from "../../assets/icons/Mypage/guide.svg";
import questionIcon from "../../assets/icons/Mypage/question.svg";
import informationIcon from "../../assets/icons/Mypage/information.svg";
import logoutIcon from "../../assets/icons/Mypage/logout.svg";
import withdrawIcon from "../../assets/icons/Mypage/withdraw.svg";

const mockUserData = {
  userName: "김성신",
  startDate: "2026.05.10",
  childName: "김성신",
};

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans pb-[80px]">
      {/* 상태바 영역 */}
      <div className="flex w-full items-center justify-between px-[24px] pb-[19px] pt-[21px]">
        <span className="text-subheadline font-semibold text-black">9:41</span>
        <div className="flex items-center gap-[5px]">
          <div className="h-[10px] w-[17px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[15px] rounded-xs bg-black"></div>
          <div className="h-[11px] w-[24px] rounded-xs bg-black"></div>
        </div>
      </div>

      {/* 헤더 영역 */}
      <TopBar title="마이페이지" variant="search" />

      <main className="flex flex-col px-[24px] pt-[16px] gap-[16px]">
        {/* 유저 정보 카드 */}
        <div
          onClick={() => navigate("/profile/edit")}
          className="flex w-full cursor-pointer items-center justify-between rounded-[12px] bg-grey-50 px-[16px] py-[12px] transition-colors active:bg-grey-100"
        >
          <div className="flex items-center gap-[16px]">
            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-white p-[14px]">
              <img
                src={boyImg}
                alt="프로필"
                className="h-full w-full object-cover"
              />
            </div>
            {/* 이름 및 가입일 텍스트 */}
            <div className="flex flex-col gap-[4px]">
              <h2 className="text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-grey-900">
                {mockUserData.userName}
              </h2>
              <p className="text-[15px] font-normal leading-[20px] tracking-[-0.24px] text-grey-700">
                {mockUserData.startDate}부터 그담을 시작했어요
              </p>
            </div>
          </div>
          <img
            src={pencilIcon}
            alt="프로필 수정"
            className="h-[24px] w-[24px] shrink-0"
          />
        </div>

        {/* 우리 아이 카드 */}
        <div className="flex w-full flex-col items-start gap-[16px] rounded-[12px] bg-grey-50 p-[16px]">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-black">
              우리 아이
            </h3>
            <img
              src={nextIcon}
              alt="더보기"
              className="h-[24px] w-[24px] cursor-pointer"
            />
          </div>

          <div className="flex w-full items-center gap-[16px]">
            {/* 등록된 아이 */}
            <button
              onClick={() => navigate("/child/edit")}
              className="flex h-[74px] flex-1 cursor-pointer items-center justify-center rounded-[12px] border border-grey-100 bg-white px-[12px] transition-colors active:bg-grey-50"
            >
              <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-grey-50 p-[11px]">
                <img
                  src={boyImg}
                  alt="아이 프로필"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="ml-[8px] whitespace-nowrap text-[15px] font-semibold leading-[20px] tracking-[-0.24px] text-black">
                {mockUserData.childName}
              </span>
              <img
                src={pencilIcon}
                alt="수정"
                className="ml-[12px] h-[24px] w-[24px]"
              />
            </button>

            {/* 아이 추가 버튼 */}
            <button
              onClick={() => navigate("/child/add")}
              className="flex h-[74px] flex-1 cursor-pointer items-center justify-center gap-[16px] rounded-[12px] border border-grey-100 bg-white px-[12px] transition-colors active:bg-grey-50"
            >
              <span className="text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-grey-700">
                아이 추가
              </span>
              <img
                src={mypagePlusIcon}
                alt="추가"
                className="h-[24px] w-[24px]"
              />
            </button>
          </div>
        </div>

        {/* 고객 지원 카드 */}
        <div className="flex w-full flex-col items-start gap-[24px] rounded-[12px] bg-grey-50 p-[16px]">
          <h3 className="text-[16px] font-semibold leading-[21px] tracking-[-0.32px] text-grey-900">
            고객 지원
          </h3>

          <div className="flex w-full flex-col gap-[28px]">
            {/* 사용 가이드 */}
            <div className="flex w-full cursor-pointer items-center justify-between active:opacity-70">
              <div className="flex items-center gap-[8px]">
                <img
                  src={guideIcon}
                  alt="가이드"
                  className="h-[24px] w-[24px]"
                />
                <span className="text-[16px] font-normal leading-[21px] tracking-[-0.41px] text-grey-900">
                  사용 가이드
                </span>
              </div>
              <img
                src={nextIcon}
                alt="이동"
                className="h-[24px] w-[24px] opacity-40"
              />
            </div>

            {/* 자주 묻는 질문 */}
            <div className="flex w-full cursor-pointer items-center justify-between active:opacity-70">
              <div className="flex items-center gap-[8px]">
                <img
                  src={questionIcon}
                  alt="자주 묻는 질문"
                  className="h-[24px] w-[24px]"
                />
                <span className="text-[16px] font-normal leading-[21px] tracking-[-0.41px] text-grey-900">
                  자주 묻는 질문
                </span>
              </div>
              <img
                src={nextIcon}
                alt="이동"
                className="h-[24px] w-[24px] opacity-40"
              />
            </div>

            {/* 약관 및 정책 */}
            <div className="flex w-full cursor-pointer items-center justify-between active:opacity-70">
              <div className="flex items-center gap-[8px]">
                <img
                  src={informationIcon}
                  alt="약관 및 정책"
                  className="h-[24px] w-[24px]"
                />
                <span className="text-[16px] font-normal leading-[21px] tracking-[-0.41px] text-grey-900">
                  약관 및 정책
                </span>
              </div>
              <img
                src={nextIcon}
                alt="이동"
                className="h-[24px] w-[24px] opacity-40"
              />
            </div>
          </div>
        </div>

        {/* 개인 정보 카드 */}
        <div className="flex w-full flex-col items-start gap-[24px] rounded-[12px] bg-grey-50 p-[16px]">
          <h3 className="text-[16px] font-semibold leading-[21px] tracking-[-0.32px] text-grey-900">
            개인 정보
          </h3>

          <div className="flex w-full flex-col gap-[24px]">
            {/* 로그아웃 */}
            <div className="flex w-full cursor-pointer items-center justify-between active:opacity-70">
              <div className="flex items-center gap-[8px]">
                <img
                  src={logoutIcon}
                  alt="로그아웃"
                  className="h-[24px] w-[24px]"
                />
                <span className="text-[16px] font-normal leading-[21px] tracking-[-0.41px] text-grey-900">
                  로그아웃
                </span>
              </div>
              <img
                src={nextIcon}
                alt="이동"
                className="h-[24px] w-[24px] opacity-40"
              />
            </div>

            {/* 탈퇴하기 */}
            <div className="flex w-full cursor-pointer items-center justify-between active:opacity-70">
              <div className="flex items-center gap-[8px]">
                <img
                  src={withdrawIcon}
                  alt="탈퇴하기"
                  className="h-[24px] w-[24px]"
                />
                <span className="text-[16px] font-normal leading-[21px] tracking-[-0.41px] text-grey-900">
                  탈퇴하기
                </span>
              </div>
              <img
                src={nextIcon}
                alt="이동"
                className="h-[24px] w-[24px] opacity-40"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPage;

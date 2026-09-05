import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";
import { Popup } from "../../components/common/Popup";
import { useAuth } from "../../contexts/AuthContext";
import { getMyPage, logout as apiLogout, deleteAccount, type MyPageInfo } from "../../api/mypage";

import pencilIcon from "../../assets/icons/Mypage/pencil.svg";
import nextIcon from "../../assets/icons/Mypage/next.svg";
import mypagePlusIcon from "../../assets/icons/Mypage/mypageplus.svg";
import guideIcon from "../../assets/icons/Mypage/guide.svg";
import questionIcon from "../../assets/icons/Mypage/question.svg";
import informationIcon from "../../assets/icons/Mypage/information.svg";
import logoutIcon from "../../assets/icons/Mypage/logout.svg";
import withdrawIcon from "../../assets/icons/Mypage/withdraw.svg";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [myPageInfo, setMyPageInfo] = useState<MyPageInfo | null>(null);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isWithdrawPopupOpen, setIsWithdrawPopupOpen] = useState(false);

  useEffect(() => {
    getMyPage().then(setMyPageInfo).catch(console.error);
  }, []);

  const handleLogout = async () => {
    await apiLogout().catch(console.error);
    logout();
    navigate("/login", { replace: true });
  };

  const handleDeleteAccount = async () => {
    await deleteAccount().catch(console.error);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans relative">

      {/* 헤더 영역 */}
      <TopBar title="마이페이지" variant="none" />

      <main className="flex flex-col px-[16px] pt-[16px] gap-[16px] pb-[64px]">
        {/* 유저 정보 카드 */}
        <div
          onClick={() => navigate("/profile/edit")}
          className="flex w-full cursor-pointer items-center justify-between rounded-[12px] bg-grey-50 px-[16px] py-[12px] transition-colors active:bg-grey-100"
        >
          <div className="flex items-center gap-[16px]">
            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-white">
              <span className="text-[32px]">🏡</span>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h2 className="text-[17px] font-semibold leading-[22px] tracking-[-0.41px] text-grey-900">
                {myPageInfo?.user.nickname ?? "—"}
              </h2>
              <p className="text-[14px] font-normal leading-[20px] tracking-[-0.24px] text-grey-700">
                {myPageInfo?.summary.joined_message?.replace("그림 AI", "그담을") ?? ""}
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
          </div>

          <div className="flex w-full flex-wrap gap-[16px]">
            {/* 등록된 아이 목록 */}
            {myPageInfo?.children.map((child) => (
              <button
                key={child.child_id}
                onClick={() => navigate("/child/edit", { state: { child } })}
                className="flex h-[64px] flex-1 cursor-pointer items-center justify-center rounded-[12px] border border-grey-100 bg-white px-[12px] transition-colors active:bg-grey-50"
              >
                <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-grey-50">
                  <span className="text-[26px]">{child.gender === "female" ? "🧒🏻" : "👦🏻"}</span>
                </div>
                <span className="ml-[8px] whitespace-nowrap text-[15px] font-semibold leading-[20px] tracking-[-0.24px] text-black">
                  {child.name}
                </span>
                <img
                  src={pencilIcon}
                  alt="수정"
                  className="ml-[12px] h-[24px] w-[24px]"
                />
              </button>
            ))}

            {/* 아이 추가 버튼 */}
            <button
              onClick={() => navigate("/child/add")}
              className="flex h-[64px] flex-1 cursor-pointer items-center justify-center gap-[16px] rounded-[12px] border border-grey-100 bg-white px-[12px] transition-colors active:bg-grey-50"
            >
              <span className="text-e-subheadline
              text-grey-700">
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
            <div
              onClick={() => navigate("/guide")}
              className="flex w-full cursor-pointer items-center justify-between active:opacity-70"
            >
              <div className="flex items-center gap-[8px]">
                <img src={guideIcon} alt="가이드" className="h-[24px] w-[24px]" />
                <span className="text-[16px] font-normal leading-[21px] tracking-[-0.41px] text-grey-900">사용 가이드</span>
              </div>
              <img src={nextIcon} alt="이동" className="h-[24px] w-[24px] opacity-40" />
            </div>

            <div
              onClick={() => navigate("/faq")}
              className="flex w-full cursor-pointer items-center justify-between active:opacity-70"
            >
              <div className="flex items-center gap-[8px]">
                <img src={questionIcon} alt="자주 묻는 질문" className="h-[24px] w-[24px]" />
                <span className="text-[16px] font-normal leading-[21px] tracking-[-0.41px] text-grey-900">자주 묻는 질문</span>
              </div>
              <img src={nextIcon} alt="이동" className="h-[24px] w-[24px] opacity-40" />
            </div>

            <div
              onClick={() => navigate("/terms")}
              className="flex w-full cursor-pointer items-center justify-between active:opacity-70"
            >
              <div className="flex items-center gap-[8px]">
                <img src={informationIcon} alt="약관 및 정책" className="h-[24px] w-[24px]" />
                <span className="text-[16px] font-normal leading-[21px] tracking-[-0.41px] text-grey-900">약관 및 정책</span>
              </div>
              <img src={nextIcon} alt="이동" className="h-[24px] w-[24px] opacity-40" />
            </div>
          </div>
        </div>

        {/* 개인 정보 카드 */}
        <div className="flex w-full flex-col items-start gap-[24px] rounded-[12px] bg-grey-50 p-[16px]">
          <h3 className="text-[16px] font-semibold leading-[21px] tracking-[-0.32px] text-grey-900">
            개인 정보
          </h3>

          <div className="flex w-full flex-col gap-[24px]">
            <div
              onClick={() => setIsLogoutPopupOpen(true)}
              className="flex w-full cursor-pointer items-center justify-between active:opacity-70"
            >
              <div className="flex items-center gap-[8px]">
                <img src={logoutIcon} alt="로그아웃" className="h-[24px] w-[24px]" />
                <span className="text-[16px] font-normal leading-[21px] tracking-[-0.41px] text-grey-900">로그아웃</span>
              </div>
              <img src={nextIcon} alt="이동" className="h-[24px] w-[24px] opacity-40" />
            </div>

            <div
              onClick={() => setIsWithdrawPopupOpen(true)}
              className="flex w-full cursor-pointer items-center justify-between active:opacity-70"
            >
              <div className="flex items-center gap-[8px]">
                <img src={withdrawIcon} alt="탈퇴하기" className="h-[24px] w-[24px]" />
                <span className="text-[16px] font-normal leading-[21px] tracking-[-0.41px] text-grey-900">탈퇴하기</span>
              </div>
              <img src={nextIcon} alt="이동" className="h-[24px] w-[24px] opacity-40" />
            </div>
          </div>
        </div>
      </main>

      {/* 로그아웃 팝업 */}
      {isLogoutPopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-[24px]">
          <Popup
            title="로그아웃"
            subtitle="정말 로그아웃을 하시겠습니까?"
            buttons={[
              { label: "취소", theme: "light", onClick: () => setIsLogoutPopupOpen(false) },
              { label: "로그아웃", theme: "error", onClick: handleLogout },
            ]}
          />
        </div>
      )}

      {/* 계정 탈퇴 팝업 */}
      {isWithdrawPopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-[24px] pb-[80px]">
          <Popup
            title="계정 탈퇴"
            subtitle="모든 데이터가 영구적으로 삭제됩니다. 정말 탈퇴하시겠습니까?"
            buttons={[
              { label: "취소", theme: "light", onClick: () => setIsWithdrawPopupOpen(false) },
              { label: "탈퇴하기", theme: "error", onClick: handleDeleteAccount },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default MyPage;

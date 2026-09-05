import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";
import { TextField } from "../../components/common/Textfield";
import { Dropdown } from "../../components/common/Dropdown";
import { Popup } from "../../components/common/Popup";
import { ActionButton } from "../../components/common/ActionButton";
import { updateChild, deleteChild, type Child } from "../../api/mypage";

import femaleIcon from "../../assets/icons/Mypage/female_regular.svg";
import maleIcon from "../../assets/icons/Mypage/male_regular.svg";

const ChildEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const child = location.state?.child as Child | undefined;

  const [childName, setChildName] = useState(child?.name ?? "");
  const [birthYear, setBirthYear] = useState(String(child?.birth_year ?? new Date().getFullYear()));
  const toDisplay = (g?: string): "여아" | "남아" => g === "female" ? "여아" : "남아";
  const [gender, setGender] = useState<"여아" | "남아">(toDisplay(child?.gender));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const hasChanges =
    childName !== (child?.name ?? "") ||
    birthYear !== String(child?.birth_year ?? new Date().getFullYear()) ||
    gender !== toDisplay(child?.gender);

  const yearOptions = Array.from({ length: 15 }, (_, i) => String(2024 - i));

  const handleSave = async () => {
    if (!child?.child_id || !childName.trim()) return;
    setIsLoading(true);
    try {
      await updateChild(child.child_id, {
        name: childName.trim(),
        birth_year: Number(birthYear),
        gender: gender === "여아" ? "female" : "male",
      });
      navigate(-1);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!child?.child_id) return;
    setIsLoading(true);
    try {
      await deleteChild(child.child_id);
      navigate(-1);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans pb-[80px]">
      <TopBar
        variant="action"
        title="아이 정보 수정"
        rightText="확인"
        isActionDisabled={isLoading || !hasChanges}
        onBackClick={() => navigate(-1)}
        onRightAction={handleSave}
      />

      <main className="flex flex-col px-[16px] pt-[16px]">
        {/* 이름 */}
        <section>
          <h2
            className="text-left text-black text-e-body-1"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            이름
          </h2>
          <div className="mt-[16px] w-full [&>div]:w-full">
            <TextField
              variant="clearable"
              placeholder="이름을 입력해주세요"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              onClear={() => setChildName("")}
            />
          </div>
        </section>

        {/* 나이 */}
        <section className="mt-[24px] relative">
          <h2
            className="text-left text-black text-e-body-1"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            나이
          </h2>
          <div className="mt-[16px] w-full [&>button]:w-full relative">
            <Dropdown
              value={birthYear}
              isOpen={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <ul className="absolute z-10 mt-[4px] max-h-[200px] w-full overflow-y-auto rounded-sm border border-grey-200 bg-white shadow-lg">
                {yearOptions.map((year) => (
                  <li
                    key={year}
                    onClick={() => { setBirthYear(year); setIsDropdownOpen(false); }}
                    className="cursor-pointer px-[16px] py-[12px] text-body-1 text-grey-900 hover:bg-grey-50 active:bg-grey-100"
                  >
                    {year}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* 성별 */}
        <section className="mt-[24px]">
          <h2
            className="text-left text-black text-e-body-1"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            성별
          </h2>
          <div className="mt-[16px] flex w-full items-center gap-[24px]">
            <button
              onClick={() => setGender("여아")}
              className={`flex cursor-pointer flex-1 items-center justify-center gap-[10px] rounded-sm py-[14px] px-[24px] transition-colors ${
                gender === "여아" ? "bg-error-100" : "bg-grey-50"
              }`}
            >
              <div
                className={`h-[24px] w-[24px] transition-colors ${gender === "여아" ? "bg-error-500" : "bg-grey-400"}`}
                style={{
                  maskImage: `url("${femaleIcon}")`, WebkitMaskImage: `url("${femaleIcon}")`,
                  maskSize: "contain", WebkitMaskSize: "contain",
                  maskPosition: "center", WebkitMaskPosition: "center",
                  maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat",
                }}
              />
              <span className={`${gender === "여아" ? "text-error-500 text-e-body-1" : "text-grey-500 text-body-1"}`}
                style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}>
                여아
              </span>
            </button>

            <button
              onClick={() => setGender("남아")}
              className={`flex cursor-pointer flex-1 items-center justify-center gap-[10px] rounded-sm py-[14px] px-[24px] transition-colors ${
                gender === "남아" ? "bg-sub-100" : "bg-grey-50"
              }`}
            >
              <div
                className={`h-[24px] w-[24px] transition-colors ${gender === "남아" ? "bg-sub-500" : "bg-grey-400"}`}
                style={{
                  maskImage: `url("${maleIcon}")`, WebkitMaskImage: `url("${maleIcon}")`,
                  maskSize: "contain", WebkitMaskSize: "contain",
                  maskPosition: "center", WebkitMaskPosition: "center",
                  maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat",
                }}
              />
              <span className={`${gender === "남아" ? "text-sub-500 text-e-body-1" : "text-grey-500 text-body-1"}`}
                style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}>
                남아
              </span>
            </button>
          </div>
        </section>

        {/* 삭제 버튼 */}
        <ActionButton
          variant="lightRed"
          size="xl"
          showIcon={false}
          disabled={isLoading}
          className="mt-[40px] w-full"
          onClick={() => setIsDeletePopupOpen(true)}
        >
          아이 정보 삭제
        </ActionButton>
      </main>

      {/* 삭제 확인 팝업 */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-[24px]">
          <Popup
            title="아이 정보 삭제"
            subtitle={`${child?.name ?? "아이"} 정보를 삭제하시겠습니까?\n삭제된 정보는 복구할 수 없습니다.`}
            buttons={[
              { label: "취소", theme: "light", onClick: () => setIsDeletePopupOpen(false) },
              { label: "삭제", theme: "error", onClick: handleDelete },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default ChildEditPage;

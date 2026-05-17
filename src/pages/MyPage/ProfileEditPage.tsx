import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";
import { TextField } from "../../components/common/Textfield";

import momIcon from "../../assets/icons/Mypage/mom.png";
import dadIcon from "../../assets/icons/Mypage/dad.png";

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [selectedParent, setSelectedParent] = useState<
    "엄마" | "아빠" | "기타"
  >("엄마");
  const [nickname, setNickname] = useState("김성신");

  const parentOptions = [
    { id: "엄마", label: "엄마", icon: momIcon },
    { id: "아빠", label: "아빠", icon: dadIcon },
    { id: "기타", label: "기타", icon: momIcon },
  ] as const;

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

      <TopBar
        variant="action"
        title="프로필 수정"
        rightText="확인"
        onBackClick={() => navigate(-1)}
        onRightAction={() => {
          console.log("프로필 수정 완료:", { selectedParent, nickname });
          navigate(-1);
        }}
      />

      <main className="flex flex-col px-[24px] pt-[16px]">
        <section>
          <h2
            className="text-black text-left text-e-body-1"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            양육자
          </h2>

          <div className="mt-[16px] flex w-full items-center gap-[10px]">
            {parentOptions.map((option) => {
              const isActive = selectedParent === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedParent(option.id)}
                  className={`flex cursor-pointer flex-1 items-center gap-[10px] rounded-sm px-[16px] py-[12px] transition-colors ${
                    isActive
                      ? "border border-main-500 bg-main-100"
                      : "border border-grey-200 bg-white"
                  }`}
                >
                  <div
                    className="flex shrink-0 items-center justify-center rounded-full bg-grey-50"
                    style={{
                      padding: "9.333px 8.667px 9.667px 9.333px",
                    }}
                  >
                    <img
                      src={option.icon}
                      alt={option.label}
                      className="h-[16px] w-[16px] object-contain"
                    />
                  </div>

                  <span
                    className="text-black text-e-body-2"
                    style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
                  >
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-[24px]">
          <h2
            className="text-black text-left text-e-body-1"
            style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
          >
            닉네임
          </h2>

          <div className="mt-[16px] w-full [&>div]:w-full">
            <TextField
              variant="clearable"
              placeholder="김성신"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onClear={() => setNickname("")}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfileEditPage;

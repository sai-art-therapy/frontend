import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";
import { TextField } from "../../components/common/Textfield";

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("김성신");

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans pb-[80px]">
      

      <TopBar
        variant="action"
        title="프로필 수정"
        rightText="확인"
        onBackClick={() => navigate(-1)}
        onRightAction={() => {
          console.log("프로필 수정 완료:", { nickname });
          navigate(-1);
        }}
      />

      <main className="flex flex-col px-[16px] pt-[16px]">

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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";
import { TextField } from "../../components/common/Textfield";
import { getMyPage, updateProfile } from "../../api/mypage";

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [originalNickname, setOriginalNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMyPage().then((data) => {
      setNickname(data.user.nickname);
      setOriginalNickname(data.user.nickname);
    }).catch(console.error);
  }, []);

  const hasChanges = nickname !== originalNickname;

  const handleSave = async () => {
    if (!nickname.trim()) return;
    setIsLoading(true);
    try {
      await updateProfile(nickname.trim());
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
        title="프로필 수정"
        rightText="확인"
        isActionDisabled={isLoading || !hasChanges}
        onBackClick={() => navigate(-1)}
        onRightAction={handleSave}
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
              placeholder="닉네임을 입력해주세요"
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

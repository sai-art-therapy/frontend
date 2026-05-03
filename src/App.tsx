import { useState } from "react";
import { TextField } from "./components/common/TextField";

function App() {
  const [clearableText, setClearableText] = useState("");
  const [defaultText, setDefaultText] = useState("");
  const [errorText, setErrorText] = useState("오류가 발생했습니다");

  return (
    <div className="flex min-h-screen flex-col items-center bg-grey-50 p-10">
      <div className="flex w-full max-w-[400px] flex-col gap-8 rounded-lg bg-white p-8 shadow-sm">
        <h2 className="text-title-3 font-bold text-grey-800">
          TextField 테스트
        </h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-body-2 font-semibold text-grey-700">
              1. Clearable 유형
            </label>
            <TextField
              variant="clearable"
              placeholder="입력 시 테두리가 검게 변합니다"
              value={clearableText}
              onChange={(e) => setClearableText(e.target.value)}
              onClear={() => setClearableText("")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-2 font-semibold text-grey-700">
              2. Default 유형
            </label>
            <TextField
              variant="default"
              placeholder="입력해도 테두리 회색 유지"
              value={defaultText}
              onChange={(e) => setDefaultText(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-2 font-semibold text-grey-700">
              3. 에러 상태
            </label>
            <TextField
              isError={true}
              placeholder="에러 상태"
              value={errorText}
              onChange={(e) => setErrorText(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-2 font-semibold text-grey-700">
              4. 비활성화 상태
            </label>
            <TextField
              disabled={true}
              placeholder="입력할 수 없습니다"
              value="비활성화된 텍스트"
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import { Dropdown } from "./components/common/Dropdown";

function App() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center bg-grey-50 p-10">
      <div className="flex w-full max-w-[400px] flex-col gap-8 rounded-lg bg-white p-8 shadow-sm">
        <h2 className="text-title-3 font-bold text-grey-800">
          Dropdown 테스트
        </h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-body-2 font-semibold text-grey-700">
              1. 기본 상태
            </label>
            <Dropdown
              placeholder="레이블"
              isOpen={isOpen1}
              onClick={() => setIsOpen1(!isOpen1)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-2 font-semibold text-grey-700">
              2. 값 선택됨
            </label>
            <Dropdown
              value="텍스트"
              placeholder="레이블"
              isOpen={isOpen2}
              onClick={() => setIsOpen2(!isOpen2)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-2 font-semibold text-grey-700">
              3. 열림 (Active) 고정
            </label>
            <Dropdown placeholder="레이블" isOpen={true} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-2 font-semibold text-grey-700">
              4. 비활성화 (Disabled)
            </label>
            <Dropdown placeholder="레이블" disabled={true} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-2 font-semibold text-grey-700">
              5. 에러 상태
            </label>
            <Dropdown placeholder="레이블" isError={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

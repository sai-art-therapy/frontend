import { useState } from "react";
import { SearchBar } from "./components/common/SearchBar";

function App() {
  const [searchText1, setSearchText1] = useState("");
  const [searchText2, setSearchText2] = useState("미리 입력된 검색어");

  return (
    <div className="flex min-h-screen flex-col items-center bg-grey-50 p-10">
      <div className="flex w-full max-w-[400px] flex-col gap-8 rounded-lg bg-white p-8 shadow-sm">
        <h2 className="text-title-3 font-bold text-grey-800">
          SearchBar 테스트
        </h2>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-body-2 font-semibold text-grey-700">
              1. 인터랙션 테스트
            </label>
            <p className="text-caption text-grey-500 mb-2">
              클릭(포커스)하고 글자를 쓴 뒤, 바깥 바탕을 클릭(블러)해 보세요.
            </p>
            <SearchBar
              value={searchText1}
              onChange={(e) => setSearchText1(e.target.value)}
              onClear={() => setSearchText1("")}
              placeholder="검색어를 입력해주세요"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-2 font-semibold text-grey-700">
              2. 값이 있는 상태
            </label>
            <p className="text-caption text-grey-500 mb-2">
              포커스가 없으면 3번째 유형, 클릭하면 2번째 유형(X버튼 노출)이
              됩니다.
            </p>
            <SearchBar
              value={searchText2}
              onChange={(e) => setSearchText2(e.target.value)}
              onClear={() => setSearchText2("")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

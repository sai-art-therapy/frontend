function App() {
  return (
    <div className="p-side bg-white min-h-screen">
      <h1 className="text-e-large-title text-main-500">GDAM 디자인 시스템</h1>
      <p className="text-body-1 text-grey-700 mt-4">
        시스템이 잘 적용되었습니다. 양 옆 간격은 16px(side)입니다.
      </p>

      <div className="mt-8 space-y-4">
        <div className="text-e-title-3 text-sub-600">Typography Test:</div>
        <p className="text-large-title">Basic Large Title (34px)</p>
        <p className="text-e-large-title">
          Emphasized Large Title (34px, Bold)
        </p>
        <p className="text-caption-1 text-error-500">
          에러 메시지 예시 (Caption 1)
        </p>
      </div>

      <button className="mt-safe-bottom bg-main-500 text-white px-6 py-2 rounded-md">
        공통 버튼 예시 (Radius 12px)
      </button>
    </div>
  );
}
export default App;

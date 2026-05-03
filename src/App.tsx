import { Popup } from "./components/common/Popup";

function App() {
  return (
    <div className="min-h-screen bg-grey-50 p-10">
      <h2 className="mb-8 text-title-3 font-bold text-grey-800">
        Popup 7가지 템플릿
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Popup
          title="타이틀"
          subtitle="서브 타이틀"
          buttons={[{ label: "레이블", theme: "dark" }]}
        />

        <Popup
          title="타이틀"
          subtitle="서브 타이틀"
          buttons={[{ label: "레이블", theme: "light" }]}
        />

        <Popup
          title="타이틀"
          subtitle="서브 타이틀"
          buttons={[{ label: "레이블", theme: "ember" }]}
        />

        <Popup
          title="타이틀"
          subtitle="서브 타이틀"
          buttons={[
            { label: "레이블", theme: "light" },
            { label: "레이블", theme: "ember" },
          ]}
        />

        <Popup
          title="타이틀"
          subtitle="서브 타이틀"
          buttons={[
            { label: "레이블", theme: "light" },
            { label: "레이블", theme: "dark" },
          ]}
        />

        <Popup
          title="타이틀"
          subtitle="서브 타이틀"
          buttons={[
            { label: "레이블", theme: "light" },
            { label: "레이블", theme: "error" },
          ]}
        />

        <Popup
          title="타이틀"
          subtitle="서브 타이틀"
          buttons={[
            { label: "레이블", theme: "light" },
            { label: "레이블", theme: "success" },
          ]}
        />
      </div>
    </div>
  );
}

export default App;

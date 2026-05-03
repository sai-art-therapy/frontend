import { Chip, type ChipTheme } from "./components/common/Chip";

function App() {
  const solidThemes: ChipTheme[] = [
    "solid-light",
    "solid-dark",
    "solid-light-active",
    "solid-dark-active",
  ];
  const outlineThemes: ChipTheme[] = [
    "outline-grey",
    "outline-primary",
    "outline-grey-active",
    "outline-primary-active",
  ];

  return (
    <div className="flex flex-col gap-10 bg-white min-h-screen p-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-grey-800">
          1. Medium Solid (No Icon / Drop / X)
        </h2>
        <div className="flex gap-4">
          {solidThemes.map((theme) => (
            <Chip key={theme} label="레이블" theme={theme} />
          ))}
        </div>
        <div className="flex gap-4">
          {solidThemes.map((theme) => (
            <Chip key={theme} label="레이블" theme={theme} icon="drop" />
          ))}
        </div>
        <div className="flex gap-4">
          {solidThemes.map((theme) => (
            <Chip key={theme} label="레이블" theme={theme} icon="x" />
          ))}
        </div>
      </section>

      <hr className="border-grey-200" />

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-grey-800">
          2. Medium Outline (No Icon / Drop / X)
        </h2>
        <div className="flex gap-4">
          {outlineThemes.map((theme) => (
            <Chip key={theme} label="레이블" theme={theme} />
          ))}
        </div>
        <div className="flex gap-4">
          {outlineThemes.map((theme) => (
            <Chip key={theme} label="레이블" theme={theme} icon="drop" />
          ))}
        </div>
        <div className="flex gap-4">
          {outlineThemes.map((theme) => (
            <Chip key={theme} label="레이블" theme={theme} icon="x" />
          ))}
        </div>
      </section>

      <hr className="border-grey-200" />

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-grey-800">
          3. Large Solid & Disabled
        </h2>
        <div className="flex gap-4">
          {solidThemes.map((theme) => (
            <Chip key={theme} label="레이블" theme={theme} size="large" />
          ))}
        </div>
        <div className="flex gap-4 mt-2">
          <Chip label="비활성화" size="large" disabled={true} />
        </div>
      </section>
    </div>
  );
}

export default App;

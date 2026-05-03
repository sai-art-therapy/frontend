import { ActionButton } from "./components/common/ActionButton";

function App() {
  return (
    <div className="p-8 space-y-6 bg-white min-h-screen">
      <h1 className="text-large-title text-main-500 mb-8">
        Button Component Test
      </h1>

      {/* 1. 다양한 사이즈 테스트 */}
      <div className="flex items-end gap-4">
        <ActionButton size="xl" variant="darkGrey">
          Button
        </ActionButton>
        <ActionButton size="lg" variant="darkGrey">
          Button
        </ActionButton>
        <ActionButton size="md" variant="darkGrey">
          Button
        </ActionButton>
        <ActionButton size="sm" variant="darkGrey">
          Button
        </ActionButton>
      </div>

      {/* 2. 다양한 색상 테스트 (오렌지 계열) */}
      <div className="flex gap-4">
        <ActionButton size="md" variant="orange">
          Button
        </ActionButton>
        <ActionButton size="md" variant="mediumOrange">
          Button
        </ActionButton>
        <ActionButton size="md" variant="lightOrange">
          Button
        </ActionButton>
      </div>

      {/* 3. 비활성화(Disabled) 테스트 & 아이콘 없는 버전 */}
      <div className="flex gap-4">
        <ActionButton size="lg" variant="orange" disabled>
          Disabled Button
        </ActionButton>
        <ActionButton size="lg" variant="mediumGreen" showIcon={false}>
          No Icon
        </ActionButton>
      </div>
    </div>
  );
}

export default App;

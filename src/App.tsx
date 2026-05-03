import { Tag } from "./components/common/Tag";

function App() {
  return (
    <div className="flex gap-2 p-4">
      <Tag variant="soft" color="orange" size="lg">
        레이블
      </Tag>
      <Tag variant="outline" color="red" size="md">
        레이블
      </Tag>
      <Tag variant="solid" color="blue" size="sm">
        레이블
      </Tag>
    </div>
  );
}
export default App;

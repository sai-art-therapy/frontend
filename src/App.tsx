// src/App.tsx
import { TopBar } from "./components/common/TopBar";

function App() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <TopBar variant="search" title="Text" />
      <div className="h-10" />
      <TopBar variant="action" title="Text" rightText="Text" />
      <div className="h-10" />
      <TopBar
        variant="action"
        title="Text"
        rightText="Text"
        isActionDisabled={true}
      />
    </div>
  );
}

export default App;

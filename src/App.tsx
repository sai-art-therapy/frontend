function App() {
  return (
    // bg-slate-900: 배경색, flex: 중앙 정렬용, h-screen: 화면 꽉 채우기
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-md">
        GDAM PROJECT
      </h1>
      <p className="mt-4 text-xl text-slate-300">
        Tailwind CSS가 성공적으로 연결되었습니다! 🚀
      </p>

      <button className="mt-8 rounded-full bg-blue-600 px-6 py-2 font-semibold hover:bg-blue-500 transition-all">
        시작하기
      </button>
    </div>
  );
}

export default App;

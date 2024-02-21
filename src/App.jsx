import "./App.css";
import Timer from "./components/Timer";
import ClickSpark from "./components/ClickSpark";

function App() {
  return (
    <div className='bg-slate-800 h-dvh text-slate-200	p-4 flex flex-col items-center'>
      <h1 className='text-3xl font-bold m-4'>Pomodoro Timer</h1>
      <Timer />
      <ClickSpark />
    </div>
  );
}

export default App;

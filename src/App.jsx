import './App.css'
import Timer from './components/Timer'
// import CountUpTimer from './components/CountUpTimer';

function App() {

  return (
    <div className='bg-slate-800 h-dvh text-slate-200	p-4 flex flex-col items-center'>
      <h1 className='text-3xl font-bold '>Tomato Clock</h1>
      <Timer />
      {/* <CountUpTimer /> */}
    </div>
  );
}

export default App

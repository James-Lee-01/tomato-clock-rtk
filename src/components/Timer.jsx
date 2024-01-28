import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setTime,
  startTimer,
  stopTimer,
  resetTimer,
  decrementTimer
} from "../store/timerSlice"

const Timer = () => {
  const dispatch = useDispatch()
  const { minutes, seconds, isRunning } = useSelector(state => state.timer)
  const [setTimer, setSetTimer] = useState(0)
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        dispatch(decrementTimer())
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }

    if (minutes === 0 && seconds === 0 && isRunning) {
      setIsFinished(true)                                         
      dispatch(stopTimer());
    }
    return () => clearInterval(timerRef.current)
  }, [dispatch, isRunning, minutes, seconds, isFinished])

  const handleStart = () => {
    if (isFinished) {
      dispatch(setTime({ minutes: setTimer, seconds: 0 }));
      setIsFinished(false)
    }
    dispatch(startTimer())
  }

  const handleStop = () => {
    dispatch(stopTimer())
  }

  const handleReset = () => {
    setSetTimer(0)
    setIsFinished(false)
    dispatch(resetTimer())
  }

  const handleSetTime = (e) => {
    const newMinutes = parseInt(e.target.value, 10)
    setSetTimer(newMinutes)
    dispatch(setTime({ minutes: newMinutes, seconds: 0 }));
  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='text-4xl'>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      <div className='flex items-center justify-center m-2 gap-2'>
        <button
          onClick={handleStart}
          disabled={isRunning}
          className='btn btn-sm btn-primary'
        >
          {isFinished ? "Restart" : "Start"}
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className='btn btn-sm btn-primary'
        >
          Stop
        </button>
        <button
          onClick={handleReset}
          disabled={isRunning}
          className='btn btn-sm btn-primary btn-outline'
        >
          Reset
        </button>

        <input
          className='input input-sm input-bordered input-primary w-16'
          type='number'
          onChange={handleSetTime}
          value={setTimer}
          min={0}
          disabled={isRunning}
        />
      </div>
    </div>
  );
}

export default Timer
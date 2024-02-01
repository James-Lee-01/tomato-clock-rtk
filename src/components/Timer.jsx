import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setTime,
  startTimer,
  stopTimer,
  resetTimer,
  decrementTimer
} from "../store/timerSlice"

import { toggleSound } from "../store/soundSlice"
import useSound from "use-sound"
import notifySound from "../sounds/effect_notify.mp3"
import popSound from "../sounds/pop_sound.mp3"


const Timer = () => {
  const dispatch = useDispatch()
  const { minutes, seconds, isRunning } = useSelector(state => state.timer)
    const isSoundEnabled = useSelector((state) => state.sound.isSoundEnabled);
  const [setTimer, setSetTimer] = useState(0)
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null)
  const [play] = useSound(notifySound, { soundEnabled: isSoundEnabled });
  const [popUp] = useSound(popSound, { soundEnabled: isSoundEnabled });
  const [popDown] = useSound(popSound, {
    playbackRate: 0.6, soundEnabled: isSoundEnabled,
  });

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        dispatch(decrementTimer())
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }

    if (minutes === 0 && seconds === 0 && isRunning) {
      setIsFinished(true);
      dispatch(stopTimer());
      // 在時間結束時顯示對話框
      document.getElementById("my_modal_1").close();
      document.getElementById("my_modal_2").showModal();
      play(); //play notify sound

    }
    return () => clearInterval(timerRef.current)
  }, [dispatch, isRunning, minutes, seconds, isFinished, isSoundEnabled])

  const handleStart = () => {
    if (isFinished) {
      dispatch(setTime({ minutes: setTimer, seconds: 0 }));
      setIsFinished(false)
    }
    dispatch(startTimer())
    document.getElementById("my_modal_1").showModal();
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

  const handleIncrement = () => {
    if (Number.isNaN(setTimer)) {
      setSetTimer(1);
    } else {
      setSetTimer(setTimer + 1);
      dispatch(setTime({ minutes: setTimer + 1, seconds: 0 }));
      popUp(); // pop up sound
    }
  }

  const handleDecrement = () => {
    if (Number.isNaN(setTimer) || setTimer === 0) {
      setSetTimer(0);
    } else {
      setSetTimer(setTimer - 1);
      dispatch(setTime({ minutes: setTimer - 1, seconds: 0 }));
      popDown(); // pop down sound
    }
  }

  const SoundBtn = () => {
    const handleToggleSound = () => {
      dispatch(toggleSound())
    }
    
    return (
      <button onClick={handleToggleSound}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-8 h-8'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
            className='speaker'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16.463 8.288a5.25 5.25 0 0 1 0 7.424'
            className='arc2'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.114 5.636a9 9 0 0 1 0 12.728'
            className='arc1'
          />
        </svg>
      </button>
    );
  }
  const MuteBtn = () => {
    const handleToggleSound = () => {
      dispatch(toggleSound())
    }
    
    return (
      <button onClick={handleToggleSound}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-8 h-8'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
          />
        </svg>
      </button>
    );
  }

  return (
    <div className='flex items-center justify-center flex-col gap-4'>
      {/* Countdown */}
      <div className='grid grid-flow-col text-center auto-cols-max'>
        <div className='flex flex-col'>
          <span className='countdown font-mono text-5xl'>
            <span
              style={{
                "--value": Number.isNaN(minutes)
                  ? "00"
                  : minutes.toString().padStart(2, "0"),
              }}
            ></span>
          </span>
          min
        </div>
        <div className='flex flex-col'>
          <span className='font-mono text-5xl'>:</span>
        </div>
        <div className='flex flex-col'>
          <span className='countdown font-mono text-5xl'>
            <span
              style={{ "--value": seconds.toString().padStart(2, "0") }}
            ></span>
          </span>
          sec
        </div>
      </div>

      {/* setTime group */}
      <div className='flex gap-4 items-center'>
        {/* minus button */}
        <button
          className='btn btn-circle btn-primary btn-outline btn-xs'
          onClick={handleDecrement}
          disabled={isRunning}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
          </svg>
        </button>
        {/* time input */}
        <input
          className='input input-sm input-bordered input-primary w-24'
          type='number'
          placeholder='mins.'
          onChange={handleSetTime}
          value={setTimer}
          min={0}
          disabled={isRunning}
        />
        {/* add button */}
        <button
          className='btn btn-circle btn-primary btn-outline btn-xs'
          onClick={handleIncrement}
          disabled={isRunning}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
        </button>
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
      </div>

      {/* start modal */}
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-xl'>Keep it up!</h3>
          <p className='py-4 italic'>
            Don’t watch the clock; do what it does. Keep going.
          </p>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>

      {/* end modal and toast */}
      <dialog id='my_modal_2' className='modal'>
        <div className='toast toast-top end-auto whitespace-normal sm:min-w-max'>
          <div className='alert alert-success flex flex-col items-start gap-0'>
            <h3 className='font-bold text-xl'>You&apos;re Great!</h3>
            <p className='py-2 italic'>
              Energy and persistence conquer all things.
            </p>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>

      {/* sound */}
      {isSoundEnabled ? <SoundBtn /> : <MuteBtn />}
    </div>
  );
}

export default Timer
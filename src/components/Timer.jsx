import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setTime,
  startTimer,
  stopTimer,
  resetTimer,
  decrementTimer,
  setSetTimer,
  setIsFinished,
} from "../store/timerSlice"

import { toggleSound } from "../store/soundSlice"
import useSound from "use-sound"
import notifySound from "../sounds/effect_notify.mp3"
import popSound from "../sounds/pop_sound.mp3"
import dingSound from "../sounds/ding_sound.mp3"
import resetSound from "../sounds/reset_sound.mp3"
import dripSound from "../sounds/drip_sound.mp3"

import { SoundBtn, MuteBtn, MinusBtn, PlusBtn } from "../icons/Icons";
import { StartModal, EndModal } from "./Modals"
import Buttons from "./Buttons"
import TimeSelect from "./TimeSelect"


const Timer = () => {
  const dispatch = useDispatch()

  const { minutes, seconds, isRunning, setTimer, isFinished } = useSelector(state => state.timer)
    const isSoundEnabled = useSelector((state) => state.sound.isSoundEnabled);

  const timerRef = useRef(null)

  const [play] = useSound(notifySound, { soundEnabled: isSoundEnabled, volume: 1.5 });
  const [popUp] = useSound(popSound, { soundEnabled: isSoundEnabled });
  const [popDown] = useSound(popSound, {
    playbackRate: 0.6, soundEnabled: isSoundEnabled,
  });
  const [startNotify] = useSound(dingSound, { soundEnabled: isSoundEnabled });
  const [resetNotify] = useSound(resetSound, { soundEnabled: isSoundEnabled });
  const [stopNotify] = useSound(dripSound, {
    playbackRate: 0.5,
    soundEnabled: isSoundEnabled,
  });

  const timeOptions = [
    { label: 'Set a time for: (min)', value: 0},
    { label: '5 min', value: 5},
    { label: '10 min', value: 10},
    { label: '25 min', value: 25},
    { label: '30 min', value: 30},
    { label: '45 min', value: 45},
    { label: '60 min', value: 60},
    { label: '(Custom below)', value: setTimer, disabled: true},
  ]

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        dispatch(decrementTimer())
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }

    if (minutes === 0 && seconds === 0 && isRunning) {
      dispatch(setIsFinished(true));
      dispatch(stopTimer());
      // 在時間結束時顯示對話框
      document.getElementById("my_modal_1").close();
      document.getElementById("my_modal_2").showModal();
      play(); //play notify sound
    }
    return () => clearInterval(timerRef.current)
  }, [dispatch, isRunning, minutes, seconds, isSoundEnabled])

  const handleStart = () => {
    if (isFinished) {
      dispatch(setTime({ minutes: setTimer, seconds: 0 }));
      dispatch(setIsFinished(false));

    }
    startNotify(); // play ding sound
    dispatch(startTimer())
    document.getElementById("my_modal_1").showModal();
  }

  const handleStop = () => {
    stopNotify(); // play drip sound
    dispatch(stopTimer())
  }

  const handleReset = () => {
    resetNotify(); // play reset sound
    dispatch(setSetTimer(0));
    dispatch(setIsFinished(false));
    dispatch(resetTimer())
  }

  const handleSetTime = (e) => {
    const newMinutes = parseInt(e.target.value, 10)
    dispatch(setSetTimer(newMinutes))
    dispatch(setTime({ minutes: newMinutes, seconds: 0 }));
  }

  const handleIncrement = () => {
    popUp(); // pop up sound
    if (Number.isNaN(setTimer)) {
      dispatch(setSetTimer(1));
    } else {
      dispatch(setSetTimer(setTimer + 1));
      dispatch(setTime({ minutes: setTimer + 1, seconds: 0 }));
    }
  }

  const handleDecrement = () => {
    if (Number.isNaN(setTimer) || setTimer === 0) {
      dispatch(setSetTimer(0));
    } else {
      dispatch(setSetTimer(setTimer - 1));
      dispatch(setTime({ minutes: setTimer - 1, seconds: 0 }));
      popDown(); // pop down sound
    }
  }

  const handleToggleSound = () => {
    dispatch(toggleSound());
  };
  

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

      {/* time select */}
      <TimeSelect options={timeOptions} value={setTimer} onChange={handleSetTime} disabled={isRunning} />
      
      {/* setTime group */}
      <div className='flex gap-4 items-center'>
        <MinusBtn onClick={handleDecrement} disabled={isRunning} />

        {/* time input */}
        <input
          className='input input-sm input-bordered input-primary w-24'
          type='number'
          placeholder='min'
          onChange={handleSetTime}
          value={setTimer}
          min={0}
          disabled={isRunning}
        />

        <PlusBtn onClick={handleIncrement} disabled={isRunning} />
      </div>
      <div className='flex items-center justify-center m-2 gap-2'>
        <Buttons
          onClick={handleStart}
          disabled={isRunning}
          content={isFinished ? "Restart" : "Start"}
        />
        <Buttons onClick={handleStop} disabled={!isRunning} content='Stop' />
        <Buttons
          onClick={handleReset}
          disabled={isRunning}
          content='Reset'
          isOutline
        />
      </div>
      {/* start modal */}
      <StartModal id='my_modal_1' />
      {/* end modal and toast */}
      <EndModal id='my_modal_2' />
      {/* sound control */}
      {isSoundEnabled ? (
        <SoundBtn onClick={handleToggleSound} />
      ) : (
        <MuteBtn onClick={handleToggleSound} />
      )}
    </div>
  );
}

export default Timer
// timerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    minutes: 0, // 初始分鐘
    seconds: 0, // 初始秒數
    isRunning: false, // 是否正在計時
    setTimer: 0, // 設定的計時時間
  },
  reducers:{
    setTime: (state, action) => {
      state.minutes = action.payload.minutes;
      state.seconds = action.payload.seconds;
    },
    startTimer: (state) => {
      state.isRunning = true;
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.minutes = 0;
      state.seconds = 0;
      state.isRunning = false;
    },
    decrementTimer: (state) => {
      if (state.seconds > 0) {
        state.seconds -= 1;
      } else if (state.minutes > 0) {
        state.minutes -= 1;
        state.seconds = 59;
      }
    },
    setSetTimer: (state, action) => {
      state.setTimer = action.payload;
    }
  }
})

export const {setTime, startTimer, stopTimer, resetTimer, decrementTimer, incrementTimer, startCountUp,setSetTimer} = timerSlice.actions
export default timerSlice.reducer
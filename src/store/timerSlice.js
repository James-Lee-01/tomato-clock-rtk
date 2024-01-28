// timerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    minutes: 0, // 初始分鐘
    seconds: 0, // 初始秒數
    isRunning: false, // 是否正在計時
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
  }
})

export const {setTime, startTimer, stopTimer, resetTimer, decrementTimer, incrementTimer, startCountUp,} = timerSlice.actions
export default timerSlice.reducer
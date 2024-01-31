// store.js
import { configureStore } from "@reduxjs/toolkit";
import timerSlice from "./timerSlice";
import soundSlice from "./soundSlice";

const store = configureStore({
  reducer: {
    timer: timerSlice,
    sound: soundSlice
  }
})

export default store
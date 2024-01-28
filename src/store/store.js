// store.js
import { configureStore } from "@reduxjs/toolkit";
import timerSlice from "./timerSlice";

const store = configureStore({
  reducer: {
    timer: timerSlice
  }
})

export default store
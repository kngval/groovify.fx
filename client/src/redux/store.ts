import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import trackReducer from "./tracks";
const store = configureStore({
  reducer: {
    auth: authReducer,
    tracks: trackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

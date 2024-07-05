import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import trackReducer from "./tracks";
import artistReducer from "./artists";
import genreReducer from "./genres";
import albumReducer from "./albums";
const store = configureStore({
  reducer: {
    auth: authReducer,
    tracks: trackReducer,
    artists: artistReducer,
    albums: albumReducer,
    genres: genreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

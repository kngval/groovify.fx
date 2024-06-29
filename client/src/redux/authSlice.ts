import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  jwtToken: string | null;
  refreshToken: string | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  jwtToken: localStorage.getItem("jwtToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  accessToken: localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;

      if (state.jwtToken) localStorage.setItem("jwtToken", action.payload);
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      if (state.refreshToken)
        localStorage.setItem("refreshToken", action.payload);
    },
    setAccToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
  },
});
export const { setJwtToken, setRefreshToken, setAccToken } = authSlice.actions;
export default authSlice.reducer;

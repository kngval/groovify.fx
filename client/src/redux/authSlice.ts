import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  refresh_token: string | null;
  expires_at: number | null;
  jwtToken: string | null;
}

const initialState: AuthState = {
  refresh_token: localStorage.getItem("refresh_token"),
  jwtToken: localStorage.getItem("jwtToken"),
  expires_at: localStorage.getItem("expiresIn")
    ? parseInt(localStorage.getItem("expiresIn")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setAccessToken: (state, action: PayloadAction<string>) => {
    //   state.accessToken = action.payload;
    //   localStorage.setItem("access_token", action.payload);
    // },
    setAuthTokens: (
      state,
      action: PayloadAction<{ refresh_token: string; expires_in: number }>
    ) => {
      const { expires_in, refresh_token } = action.payload;
      state.expires_at = expires_in;
      state.refresh_token = refresh_token;

      if (expires_in) localStorage.setItem("expiresIn", expires_in.toString());
      if (refresh_token) localStorage.setItem("refresh_token", refresh_token);
    },
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;
      if (state.jwtToken) localStorage.setItem("jwtToken", action.payload);
    },
    // decrementExpiresIn(state) {
    //   if (state.expires_in && state.expires_in > 0) {
    //     state.expires_in -= 1;
    //   }
    // },
  },
});
export const { setAuthTokens, setJwtToken } =
  authSlice.actions;
export default authSlice.reducer;

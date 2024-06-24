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
    ? parseInt(localStorage.getItem("expiresIn")!,10)
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
    setAuthTokens: (state, action: PayloadAction<number>) => {
      state.expires_at = action.payload;

      if (action.payload)
        localStorage.setItem("expiresIn", action.payload.toString());
    },
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;
      if (state.jwtToken) localStorage.setItem("jwtToken", action.payload);
    },
    setRefToken: (state, action: PayloadAction<{ refresh_token: string }>) => {
      const { refresh_token } = action.payload;
      state.refresh_token = refresh_token;
      if (state.refresh_token)
        localStorage.setItem("refresh_token", refresh_token);
    },
    decrementExpiresIn(state) {
      if (state.expires_at && state.expires_at > 0) {
        state.expires_at -= 1;
        localStorage.setItem("expiresIn", state.expires_at.toString());
      }
    },
  },
});
export const { setAuthTokens, setRefToken, decrementExpiresIn, setJwtToken } =
  authSlice.actions;
export default authSlice.reducer;

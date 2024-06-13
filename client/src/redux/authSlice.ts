import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  // accessToken: string | null;
  jwtToken: string | null;
}

const initialState: AuthState = {
  // accessToken: localStorage.getItem("access_token"),
  jwtToken: localStorage.getItem("jwtToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setAccessToken: (state, action: PayloadAction<string>) => {
    //   state.accessToken = action.payload;
    //   localStorage.setItem("access_token", action.payload);
    // },
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;
      localStorage.setItem("jwtToken", action.payload);
    },
  },
});
export const { setJwtToken } = authSlice.actions;
export default authSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  jwtToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  jwtToken: localStorage.getItem("jwtToken"),
  refreshToken: localStorage.getItem("refreshToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;

      if (state.jwtToken)
        localStorage.setItem("jwtToken", action.payload);
    },
    setRefToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      if (state.refreshToken)
        localStorage.setItem("refreshToken", action.payload);
    },
  },
});
export const { setJwtToken , setRefToken} = authSlice.actions;
export default authSlice.reducer;

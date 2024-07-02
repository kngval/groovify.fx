import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

interface GenresStructure {
  sortedGenres: [string, number][];
}

interface GenresState {
  genres: GenresStructure | null;
}

const initialState: GenresState = {
  genres: null,
};

export const fetchTopGenres = createAsyncThunk(
  "api/genres",
  async (
    {
      time_range,
      limit,
      offset,
    }: { time_range: string; limit: number; offset: number },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const { jwtToken, accessToken } = state.auth;

    if (!jwtToken || accessToken) {
      rejectWithValue("No JWT or Access Token Present");
    }
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_URL
        }/api/top-genres?time_range=${time_range}&limit=${limit}&offset=${offset}&accessToken=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log("TOP GENRES : ", res.data);
      return res.data as GenresStructure;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const genreSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTopGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
    });
  },
});

export default genreSlice.reducer;

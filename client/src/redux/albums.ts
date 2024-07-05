import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

interface AlbumStructure {
  sortedAlbums: {
    name: string;
    artist: {
      name: string;
      link: string;
    }[];
    images: {
      url: string;
    }[];
  }[];
}

interface AlbumState {
  albums: AlbumStructure | null;
}

const initialState: AlbumState = {
  albums: null,
};

export const fetchTopAlbums = createAsyncThunk(
  "api/albums",
  async (
    {
      time_range,
      limit,
      offset,
    }: {
      time_range: string;
      limit: number;
      offset: number;
    },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const { jwtToken, accessToken } = state.auth;

    if (!jwtToken || !accessToken) {
      rejectWithValue("No JWT or Access token present");
    }

    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_URL
        }/api/top-albums?time_range=${time_range}&limit=${limit}&offset=${offset}&accessToken=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      return res.data as AlbumStructure;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchTopAlbums.fulfilled,
      (state, action: PayloadAction<AlbumStructure>) => {
        state.albums = action.payload;
      }
    );
  },
});

export default albumSlice.reducer;

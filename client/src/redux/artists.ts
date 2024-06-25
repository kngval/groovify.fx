import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

interface ArtistStructure {
  items: {
    name: string;
    external_urls: {
      spotify: string;
    };
    images: {
      url: string;
    }[];
  }[];
}

interface ArtistState {
  artists: ArtistStructure | null;
  loading: boolean;
}

const initialState: ArtistState = {
  artists: null,
  loading: false,
};

export const fetchTopArtists = createAsyncThunk(
  "api/artists",
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
    const jwtToken = state.auth.jwtToken;
    if (!jwtToken) {
      rejectWithValue("No JWT Present.");
    }
    try {
      const res = await axios.get(
        `http://localhost:3000/api/top-artists?time_range=${time_range}&offset=${offset}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log("TOP ARTISTS : ", res.data.data);
      return res.data.data as ArtistStructure;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchTopArtists.fulfilled,
      (state, action: PayloadAction<ArtistStructure>) => {
        state.artists = action.payload;
      }
    );
  },
});

export default artistSlice.reducer;

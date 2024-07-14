import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

interface TrackStructure {
  items:
    | {
        album: {
          images: {
            url: string;
          }[];
        };
        artists: {
          external_urls: {
            spotify: string;
          };
          name: string;
        }[];
        external_urls: {
          spotify: string;
        };
        name: string;
        duration_ms: number;
        popularity:number;
      }[]
    | null;
}

interface TrackState {
  tracks: TrackStructure | null;
  loading: boolean;
}

const initialState: TrackState = {
  tracks: null,
  loading: false,
};

export const fetchTopTracks = createAsyncThunk(
  "api/tracks",

  async (
    { time_range, limit,offset }: { time_range: string; limit: number; offset:number },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const {jwtToken,accessToken} = state.auth;
    if (!jwtToken && accessToken) {
      rejectWithValue("No JWT & Access Token present");
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/top-tracks?time_range=${time_range}&limit=${limit}&offset=${offset}&accessToken=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log("Top Tracks : ", response.data.data.items);
      return response.data.data as TrackStructure;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTopTracks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTopTracks.fulfilled,
      (state, action: PayloadAction<TrackStructure>) => {
        state.tracks = action.payload;
        state.loading = false;
      }
    );
  },
});

export default trackSlice.reducer;

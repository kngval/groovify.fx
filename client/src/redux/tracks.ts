import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

interface TrackStructure {
  items:
    | [
        {
          album: {
            images: [
              {
                url: string;
              }
            ];
          };
          artists: [
            {
              external_urls: {
                spotify: string;
              };
              name: string;
            }
          ];
          external_urls: {
            spotify: string;
          };
          name: string;
        }
      ]
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

  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const jwtToken = state.auth.jwtToken;
    console.log("TOKEN FN : ", jwtToken);
    if (!jwtToken) {
      rejectWithValue("No JWT present");
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/api/top-tracks?time_range=short_term&limit=50&offset=0`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log("Top Tracks : ", response.data);
      return response.data;
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

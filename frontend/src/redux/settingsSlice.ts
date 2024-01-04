import { createSlice } from "@reduxjs/toolkit";

interface settingsState {
  options: {
    min_tempo: number;
    max_tempo: number;
    min_danceability: number;
    max_danceability: number;
    min_energy: number;
    max_energy: number;
    min_popularity: number;
    max_popularity: number;
    min_speechiness: number;
    max_speechiness: number;
    min_liveness: number;
    max_liveness: number;
  };
}

const initialState: settingsState = {
  options: {
    min_tempo: 0,
    max_tempo: 250,
    min_danceability: 0,
    max_danceability: 1,
    min_energy: 0,
    max_energy: 1,
    min_popularity: 0,
    max_popularity: 100,
    min_speechiness: 0,
    max_speechiness: 1,
    min_liveness: 0,
    max_liveness: 1,
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      let min = action.payload.range[0];
      let max = action.payload.range[1];

      if (action.payload.id === "tempo") {
        min = action.payload.range[0] * 2.5;
        max = action.payload.range[1] * 2.5;
      } else {
        if (action.payload.id !== "popularity") {
          min = action.payload.range[0] / 100;
          max = action.payload.range[1] / 100;
        }
      }

      switch (action.payload.id) {
        case "tempo":
          state.options.min_tempo = min;
          state.options.max_tempo = max;
          break;
        case "danceability":
          state.options.min_danceability = min;
          state.options.max_danceability = max;
          break;
        case "energy":
          state.options.min_energy = min;
          state.options.max_energy = max;
          break;
        case "popularity":
          state.options.min_popularity = min;
          state.options.max_popularity = max;
          break;
        case "speechiness":
          state.options.min_speechiness = min;
          state.options.max_speechiness = max;
          break;
        case "liveness":
          state.options.min_liveness = min;
          state.options.max_liveness = max;
          break;
      }
    },
  },
});

export const { updateSettings } = settingsSlice.actions;

export default settingsSlice.reducer;

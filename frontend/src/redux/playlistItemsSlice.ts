import { createSlice } from "@reduxjs/toolkit";
import { TrackData } from "../interfaces/dataInterfaces";

interface playlistItemsState {
  items: TrackData[];
}

const initialState: playlistItemsState = { items: [] };

export const playlistItemsSlice = createSlice({
  name: "playlistItems",
  initialState,
  reducers: {
    insertPlaylistItems: (state, action) => {
      state.items.push(...action.payload);
    },
    clearPlaylistItems: (state) => {
      state.items = [];
    },
  },
});

export const { insertPlaylistItems, clearPlaylistItems } = playlistItemsSlice.actions;

export default playlistItemsSlice.reducer;

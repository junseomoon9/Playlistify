import { createSlice } from "@reduxjs/toolkit";
import { ChosenTopItemData } from "../interfaces/dataInterfaces";

interface chosenTopItemsState {
  items: ChosenTopItemData[];
}

const initialState: chosenTopItemsState = { items: [] };

export const chosenTopItemsSlice = createSlice({
  name: "chosenTopItems",
  initialState,
  reducers: {
    chooseTopItem: (state, action) => {
      state.items.push(action.payload)
    },
    removeTopItem: (state, action) => {
      state.items = state.items.filter((item) => {
        return item.id !== action.payload.id
      })
    },
  },
});

export const { chooseTopItem, removeTopItem } = chosenTopItemsSlice.actions;

export default chosenTopItemsSlice.reducer;

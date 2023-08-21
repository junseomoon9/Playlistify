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
      const indexToRemove = state.items.indexOf(action.payload)
      state.items.splice(indexToRemove, 1)
    },
  },
});

export const { chooseTopItem, removeTopItem } = chosenTopItemsSlice.actions;

export default chosenTopItemsSlice.reducer;

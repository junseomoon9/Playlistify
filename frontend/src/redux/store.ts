import { configureStore } from "@reduxjs/toolkit";
import chosenTopItemsReducer from "./chosenTopItemsSlice";
import playlistItemsReducer from "./playlistItemsSlice";
import settingsReducer from "./settingsSlice";

const store = configureStore({
  reducer: {
    chosenTopItems: chosenTopItemsReducer,
    playlistItems: playlistItemsReducer,
    settings: settingsReducer
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

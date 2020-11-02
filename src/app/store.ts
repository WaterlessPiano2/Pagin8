import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import pageSizeSlice from "../features/books/pageSizeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pageSize: pageSizeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

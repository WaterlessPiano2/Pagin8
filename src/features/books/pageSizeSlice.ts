import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

interface pageSizeState {
  pageSize: number;
}

const initialState: pageSizeState = {
  pageSize: 5,
};

export const pageSizeSlice = createSlice({
  name: "pageSize",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    chageByValue: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

export const { chageByValue } = pageSizeSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const chagePageSize = (pageSize: number): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(chageByValue(pageSize));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPageSize = (state: RootState) => state.counter.value;

export default pageSizeSlice.reducer;

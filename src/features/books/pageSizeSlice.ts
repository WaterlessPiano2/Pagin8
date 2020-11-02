import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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
    chageByValue: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

export const { chageByValue } = pageSizeSlice.actions;

export const selectPageSize = (state: RootState) => state.pageSize.pageSize;

export default pageSizeSlice.reducer;

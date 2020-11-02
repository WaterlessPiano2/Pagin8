import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";
import { AppThunk, RootState } from "../../app/store";
import Books from "../../middleware/Books";
import { response } from "../../interfaces/books";
import { RowData } from "@material-ui/data-grid";

interface booksState {
  books: RowData[];
}

const initialState: booksState = {
  books: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    chageByValue: (state, action: PayloadAction<RowData[]>) => {
      state.books = action.payload;
    },
  },
});

export const { chageByValue } = booksSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getBooks = (query: URLSearchParams): AppThunk => (dispatch) => {

  const pageFromLink = Number(query.get("page")) || 1;
  const pageSizeFromLink = Number(query.get("itemsPerPage")) || 5;
  Books.paginated(pageFromLink, pageSizeFromLink)
    .then((response: response) => {
      dispatch(chageByValue(response.books));
    })
    .catch((err) => {
      dispatch(chageByValue([]));
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBooks = (state: RootState) => state.books.books;

export default booksSlice.reducer;

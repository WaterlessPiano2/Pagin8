import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import Books from "../../middleware/Books";
import { response } from "../../interfaces/books";

interface booksState {
  books: response;
}

const initialState: booksState = {
  books: { books: [], count: 0 },
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    chageByValue: (state, action: PayloadAction<response>) => {
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
      dispatch(chageByValue(response));
    })
    .catch((err) => {
      dispatch(chageByValue({ books: [], count: 0 }));
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBooks = (state: RootState) => state.books.books;

export default booksSlice.reducer;

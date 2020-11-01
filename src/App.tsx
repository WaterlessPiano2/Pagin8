import * as React from "react";
import logo from "./logo.svg";
// /import { Counter } from "./features/counter/Counter";
import BooksTable from "./features/books/BooksTable";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { chageByValue, selectPageSize } from "./features/books/pageSizeSlice";

function App() {
  const pageSize = useSelector(selectPageSize);
  const dispatch = useDispatch();
  const dipatchPageSize = (f: number) => dispatch(chageByValue(f));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BooksTable
          pageSize={pageSize}
          dispatchPageSize={(p: number) => dipatchPageSize(p)}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;

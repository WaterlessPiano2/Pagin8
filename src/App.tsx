import * as React from "react";
import logo from "./logo.svg";
// /import { Counter } from "./features/counter/Counter";
import DataGridDemo from "./features/books/ks";
import Books from "./middleware/Books";
import "./App.css";
import { RowsProp } from "@material-ui/data-grid";
import { response } from "./interfaces/books";

function App() {
  const [rows, setRows] = React.useState<RowsProp>([]);
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    let response: response;
    (async () => {
      response = await Books.paginated(1, 5);
      setRows(response.books);
      setCount(response.count);
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DataGridDemo />
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

import * as React from "react";
import logo from "./logo.svg";
// /import { Counter } from "./features/counter/Counter";
import BooksTable from "./features/books/BooksTable";
import "./App.css";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src="https://uploads-ssl.webflow.com/5f280c6c86cfb6f32b6e9bd9/5f2819b35e5f02759f83e497_gg-webclip.png"
            className="App-logo"
            alt="logo"
          />
          <BooksTable />
          <p>
            <code>Pagin8</code>.
          </p>
        </header>
      </div>
    );
  }
}

export default App;

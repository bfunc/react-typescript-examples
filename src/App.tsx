import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Ex1 from "./example1 - reproduce formik/Example1 - todo";
import Ex2 from "./example2 - type guards/Example2 - done";

function App() {
  return (
    <div className="App">
      <header className="App-header">Playground</header>
      <hr />
      Ex1:
      <Ex1 />
      <hr />
      Ex2:
      <Ex2 />
    </div>
  );
}

export default App;

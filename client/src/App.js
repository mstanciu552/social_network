import React from "react";
import Article from "./components/Article";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { match } from "assert";

function App() {
  return (
    <React.Fragment>
      <Router>
        <div>{/* <Article id={1}></Article> */}</div>
        <Route
          path="/article/:id"
          render={({ match }) => <Article id={match.params.id}></Article>}
        />
      </Router>
    </React.Fragment>
  );
}

export default App;

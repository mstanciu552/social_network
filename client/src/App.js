import React from "react";
import Home from "./components/Home";
import Article from "./components/Article";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
        <div>
          <Navbar></Navbar>
        </div>
        <Route exact path="/" component={Home} />
        <Route
          path="/article/:id"
          render={({ match }) => <Article id={match.params.id}></Article>}
        />
        <Route path="/user/:id" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </React.Fragment>
  );
}

export default App;

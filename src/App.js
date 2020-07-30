import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import "./style/normalize.css";
import "./App.scss";
import Home from "./views/Home";
import About from "./views/About";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="wrapper">
        <h1 className="title">213</h1>
        <HashRouter>
          <Switch>
            <Route exact component={Home} path="/"></Route>
            <Route component={About} path="/about"></Route>
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export default App;

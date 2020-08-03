import React from 'react';
// import { HashRouter, Switch, Route } from "react-router-dom";
// import Home from "./views/Home";
// import About from "./views/About";
import Login from "./views/login/";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <Login></Login>
      </div>
    )
  }
}

export default App;

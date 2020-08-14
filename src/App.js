import React from 'react';
import {  Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "./views/login/";
import Index from "./views/Index/";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route  exact component={Login} to="/" />
          <Route   component={Index} to="/index" />
        </Switch>
      </BrowserRouter>
      
    )
  }
}

export default App;

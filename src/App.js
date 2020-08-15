import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./views/login/";
import Index from "./views/Index/";
import PrivateRouter from "./components/PrivateRouter/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact component={Login} path="/"></Route>
          <PrivateRouter component={Index}></PrivateRouter>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;

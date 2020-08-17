import React from 'react';
import { Switch} from "react-router-dom";
import PrivateRouter from "../PrivateRouter/index"; 
import UserList from "../../views/User/index";
import UserAdd from "../../views/User/Add";
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
        <Switch>
          <PrivateRouter  exact component={UserList} path="/index/user/list"></PrivateRouter>
          <PrivateRouter  exact component={UserAdd} path="/index/user/add"></PrivateRouter>
                

        </Switch>
    )
  }
}

export default Container;

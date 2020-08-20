import React from 'react';
import { Switch} from "react-router-dom";
import PrivateRouter from "../PrivateRouter/index"; 
 import components from "./Router"


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
        <Switch>
         {components.map(item=>{
            return  (<PrivateRouter  exact  key={item.path} component={item.component} path={item.path} />)
            
          })} 
        </Switch>
    )
  }
}

export default Container;

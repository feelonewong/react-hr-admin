import React from 'react';
import { Switch} from "react-router-dom";
import PrivateRouter from "../PrivateRouter/index"; 

const components = [];
const files = require.context("../../views",true,/\.js$/);
files.keys().map( item=>{  
  if(item.includes("./Index")||item.includes("./login")){
    return false;
  }
  const jsonObj = {};
  const path = `/index${item.split('.')[1]}`.toLowerCase();
  const component = files(item).default;
  jsonObj.path = path;
  jsonObj.component = component;
  components.push(jsonObj);
  return '';
})

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

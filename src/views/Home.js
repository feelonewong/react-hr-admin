import React, {Fragment} from 'react';
import {Button} from "antd";
import "./Home.scss";
// import "./../style/normalize.css";
class Home extends  React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <Fragment>
                 <Button type="primary">
                    Home
                </Button>
            </Fragment>
        )
    }
}

export default Home;
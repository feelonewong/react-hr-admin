import React from 'react';
import {Button} from "antd";
class About extends  React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <div>
                <Button type="primary">About</Button>
            </div>
        )
    }
}

export default About;
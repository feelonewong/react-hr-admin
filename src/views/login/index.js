import React, { Component, Fragment } from 'react';
import "./index.scss";
import LoginForm from "./LoginForm.js";
import RegisterForm from "./RegisterForm.js";
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formType: 'login'
        };
    }
    toggleForm = (value)=>{
        this.setState({
            formType: value
        })
    }
    render() {
        return (
            <Fragment>
                {this.state.formType === 'login' ?
                    <LoginForm toggleForm={this.toggleForm}></LoginForm> :
                    <RegisterForm toggleForm={this.toggleForm}></RegisterForm>}
            </Fragment>
        )
    }
}
export default login;
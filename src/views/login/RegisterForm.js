import React, { Component, Fragment } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { Register } from "../../api/account";

import { validate_passwords, validate_email } from "../../utils/validate";

import Code from "../../components/code/index";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            passwords: "",
            module:"register",
            code:"",
            codeButtonDisabled: false,
        };
    }
    toggleMenu = () => {
        this.props.toggleForm('login');
    }
    onFinish = (value) => {
        let data = {
            "username":value.username,
            "password":value.password,
            "code": this.state.code
        }
        
        Register(data).then( (response)=>{
            message.success(response.data.message);
            this.toggleMenu();
        }).catch( (err)=>{
            
        })
    }
    usernameOnChange = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        })
    }
    passwordOnChange = (e) => {
        let value = e.target.value;
        this.setState({
            password: value
        })
    }
    passwordsOnChange = (e) => {
        let value = e.target.value;
        this.setState({
            passwords: value
        })
    }
    codeOnChange = (e)=>{
        let value = e.target.value;
        this.setState({
            code:value
        })
    }
    render() {
        let { username, codeButtonDisabled, password,code, passwords, module } = this.state;
        let _this = this;
        return (
            <Fragment>
                <div className="login">
                    <div className="form-wrapper">
                        <div className="form-header">
                            <h4 className="column">注册</h4>
                            <span className="account-register" onClick={this.toggleMenu}>登录账号</span>
                        </div>
                        <div className="form-content">
                            <Form
                                name="normal_login"
                                onFinish={this.onFinish}
                                initialValues={{ remember: true }}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        { required: true, message: '邮箱地址不能为空!' },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {

                                                if (!validate_email(value)) {
                                                    _this.setState({
                                                        codeButtonDisabled: true
                                                    })
                                                    return Promise.reject("邮箱格式不正确");
                                                } else {
                                                    _this.setState({
                                                        codeButtonDisabled: false
                                                    })
                                                    return Promise.resolve();
                                                }
                                            }
                                        })
                                    ]}
                                >
                                    <Input
                                        value={username}
                                        onChange={this.usernameOnChange}
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '密码不能为空!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(role, value) {
                                                if (!validate_passwords(value)) {
                                                    return Promise.reject('密码格式不正确!');
                                                }  
                                                if (getFieldValue("passwords") && value !== getFieldValue("passwords")) {
                                                    return Promise.reject("两次密码不一致!");
                                                } 
                                                    return Promise.resolve();
                                            }
                                        })
                                    ]}
                                >

                                    <Input
                                        value={password}
                                        onChange={this.passwordOnChange}
                                        prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                                </Form.Item>
                                <Form.Item
                                    name="passwords"
                                    rules={[
                                        {
                                            required: true,
                                            message: '密码不能为空!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(role, value) {
                                                if (!validate_passwords(value)) {
                                                    return Promise.reject('密码格式不正确!');
                                                } 
                                                 if (getFieldValue('password')&&getFieldValue('password') !== value) {
                                                    return Promise.reject("密码不一致!");
                                                } 
                                                    return Promise.resolve();
                                                
                                            }
                                        })
                                    ]}
                                >
                                    <Input
                                        value={passwords}
                                        onChange={this.passwordsOnChange}
                                        prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                                </Form.Item>
                                <Form.Item
                                >
                                    <Row gutter={13}>
                                        <Col span={15}>
                                            <Input 
                                             rules={[
                                                { required: true, message: "验证码不能为空" },
                                                { len: 6, message: "验证码长度不正确" }
                                            ]}
                                            value={code}
                                            onChange={this.codeOnChange}
                                            prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                        </Col>
                                        <Col span={9}>
                                            <Code
                                                username={username}
                                                module={module}
                                                codeButtonDisabled={codeButtonDisabled}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

}

export default RegisterForm;
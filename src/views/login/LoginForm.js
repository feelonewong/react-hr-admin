import React, { Component, Fragment } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { validate_password_reg, validate_email } from "../../utils/validate";
import { Login, getCode } from "../../api/account";
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            codeButtonDisabled: false,
            codeButtonLoading: false,
            codeButtonText: "获取验证码"
        };
    }
    toggoleMenu = () => {
        this.props.toggleForm('register');
    };
    usernameOnChange = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        })
    }
    getCode = () => {
        if (!this.state.username) {
            message.error('用户名不能为空!');
            return false;
        }
        
        this.setState({
            codeButtonLoading: true,
            codeButtonText: "发送中"
        })  
        
        let requestData = {
            username: this.state.username,
            module: "login"
        }
        getCode(requestData).then((response) => {
            // console.log(response.data)
            this.countDown();
            console.log(response.data);
        }).catch(err => {
            this.setState({
                codeButtonLoading: false,
                codeButtonText: "重新获取"
            })
            // console.log(err)
        })
    };
    countDown = () => {
        let sec = 60;
        this.setState({
            codeButtonDisabled: true,
            codeButtonText: `${sec}s`,
            codeButtonLoading: false
        })
        let timer = null;

        timer = setInterval(()=>{
            sec--;
            this.setState({
                codeButtonDisabled: true,
                codeButtonText: `${sec}s`
            })
            if(sec<=0){
                this.setState({
                    codeButtonDisabled: false,
                    codeButtonText:"重新发送"
                })
                clearInterval(timer);
                return false;
            }
        },1000)
    }
    onFinish = (values) => {
        Login(values);
    }
    render() {
        const { username, codeButtonDisabled, codeButtonLoading, codeButtonText } = this.state;
        const _this = this;
        return (
            <Fragment>
                <div className="login">
                    <div className="form-wrapper">
                        <div className="form-header">
                            <h4 className="column">登录</h4>
                            <span className="account-register" onClick={this.toggoleMenu}>注册账号</span>
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
                                        // { type: 'email', message: "邮箱格式不正确!" },
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
                                        prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '密码不能为空',
                                        },
                                        { pattern: validate_password_reg, message: "密码必须由6-20数字和字母组成" }
                                    ]}
                                >
                                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                                </Form.Item>
                                <Form.Item
                                    name="code"
                                    rules={[
                                        { required: true, message: "验证码不能为空" },
                                        { len: 6, message: "验证码长度不正确" }
                                    ]}
                                >
                                    <Row gutter={13}>
                                        <Col span={15}>
                                            <Input
                                                prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                        </Col>
                                        <Col span={9}>
                                            <Button
                                                type="primary"
                                                block
                                              
                                                loading={codeButtonLoading}
                                                disabled={codeButtonDisabled}
                                                onClick={this.getCode}>{codeButtonText}</Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

}

export default LoginForm;
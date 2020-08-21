import React, { Component, Fragment } from 'react';
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { withRouter } from "react-router-dom";
import { validate_password_reg, validate_email } from "../../utils/validate";
import { Login } from "../../api/account";
import Code from "../../components/code/index";
import { setUsername, setToken } from "../../utils/cookie";
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            codeButtonDisabled: false,
            module:"login",
            code:""
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
    codeOnChange = (e)=>{
        let value = e.target.value;
        this.setState({
            code: value
        })
    }
    onFinish = (values) => {
        
        let data = {
            "username":values.username,
            "password":values.password,
            "code": this.state.code
        }
        
        Login(data).then( (response)=>{
           message.success(response.data.message);            
           setToken(response.data.data.token)
           setUsername(this.state.username);
           this.props.history.push("/index")

        }).catch( (err)=>{
            
        })
    }
    render() {
        const { username, codeButtonDisabled, module,code } = this.state;
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
                                    value={code}
                                    onChange={this.codeOnChange}
                                >
                                    <Row gutter={13}>
                                        <Col span={15}>
                                            <Input
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

export default withRouter(LoginForm);
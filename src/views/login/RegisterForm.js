import React, { Component, Fragment } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { validate_password_reg, validate_email } from "../../utils/validate";

import Code from "../../components/code/index";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            codeButtonDisabled: false,
        };
    }
    toggleMenu = () => {
        this.props.toggleForm('login');
    }
    onFinish = () =>{

    }
    usernameOnChange = (e)=>{
        let value = e.target.value;
        this.setState({
            username: value
        })
    }
    render() {
        let { username, codeButtonDisabled } = this.state;
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
                                            message: '密码不能为空',
                                        },
                                        { pattern: validate_password_reg, message: "密码必须由6-20数字和字母组成" }
                                    ]}
                                >
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                >
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                                </Form.Item>
                                <Form.Item
                                >
                                    <Row gutter={13}>
                                        <Col span={15}>
                                            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                        </Col>
                                        <Col span={9}>
                                            <Code
                                                username={username}
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
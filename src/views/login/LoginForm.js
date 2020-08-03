import React, { Component, Fragment } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import {validate_password_reg} from "../../utils/validate";
import {Login} from "../../api/account";
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    toggoleMenu = () => {
        this.props.toggleForm('register');
    };
    onFinish = (values)=>{
        Login(values);
        console.log('this.formObject:',values);
    }
    render() {
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
                                onFinish = {this.onFinish}
                                initialValues={{ remember: true }}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        { required: true, message: '邮箱地址不能为空!' },
                                        { type: 'email', message: "邮箱格式不正确!" },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '密码不能为空',
                                        },
                                        {pattern: validate_password_reg, message:"密码必须由6-20数字和字母组成"}
                                    ]}
                                >
                                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                                </Form.Item>
                                <Form.Item
                                    name="code"
                                    rules={[
                                        {required: true, message:"验证码不能为空"},
                                        {len:6,message:"验证码长度不正确"}
                                      ]}
                                >
                                    <Row gutter={13}>
                                        <Col span={15}>
                                            <Input 
                                                
                                                prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                        </Col>
                                        <Col span={9}>
                                            <Button type="primary" block>获取验证码</Button>
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
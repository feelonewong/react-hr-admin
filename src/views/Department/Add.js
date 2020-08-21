import React, { Component } from 'react';
import { Form, Input, Button, InputNumber,Radio, message } from "antd";
import {DepartmentAddSubmit} from "../../api/account"
const {TextArea} = Input;
class DepartmentAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            number:1,
            loading: false,
            formItemLayout: {
                labelCol: { span: 2 },
                wrapperCol: { span: 14 },
            }
        }
    }
    onFinish = (value) => {
        this.setState({
            loading: true
        })
        DepartmentAddSubmit(value).then( response=>{
            const messageInfo = response.data.message;
            message.info(messageInfo);
            this.setState({
                loading: false
            })
            this.refs.form.resetFields();
        }).catch(err=>{
            this.setState({
                loading: false
            })
            message.info(err);
        })
    }
    render() {
        const { formItemLayout,status,loading } = this.state;
        return (
            <>
                <Form
                    ref="form"
                    {...formItemLayout}
                    onFinish={this.onFinish}
                    initialValues={this.state}
                >
                    <Form.Item
                        label="部门名称"
                        name="name"
                        rules={[{ required: true, message: '部门名称不能为空!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="人员数量"
                        name="number"
                        min={1}
                        max={100}
                        rules={[
                            { required: true, message: '人数不能为空!' },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    
                                    if (!value) {
                                        return Promise.reject("人数不能少于1");
                                    } else {
                                        return Promise.resolve();
                                    }
                                }
                            })
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="禁启用"
                        name="status"
                        
                    >
                        <Radio.Group  value={status} >
                            <Radio value={false}>禁止</Radio>
                            <Radio value={true}>启用</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="content"
                        rules={[{ required: true, message: '描述不能为空!' }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item >
                        <Button  loading={loading} type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

export default DepartmentAdd;
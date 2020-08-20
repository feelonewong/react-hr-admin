import React, { Component } from 'react';
import { Form, Input, Button, InputNumber,Radio, message } from "antd";
import {DepartmentAddSubmit} from "../../api/account"
const {TextArea} = Input;
class DepartmentAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            number:0,
            formItemLayout: {
                labelCol: { span: 2 },
                wrapperCol: { span: 14 },
            }
        }
    }
    onFinish = (value) => {
        DepartmentAddSubmit(value).then( response=>{
            const messageInfo = response.data.message;
            message.info(messageInfo);
        }).catch(err=>{
            message.info(err);
        })
    }
    render() {
        const { formItemLayout,status } = this.state;
        return (
            <>
                <Form
                    {...formItemLayout}
                    onFinish={this.onFinish}
                    initialValues={this.state}
                >
                    <Form.Item
                        label="部门名称"
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="人员数量"
                        name="number"
                        min={1}
                        
                        max={100}
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
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

export default DepartmentAdd;
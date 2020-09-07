import React, { Component } from 'react';
import { Form, Input, Button, InputNumber,Radio, message } from "antd";
import {DepartmentAddSubmit } from "../../api/account"
import {DepartmentDetails, DepartmentEdit} from "@/api/department";
//form component
import FormComponent from "@/components/formComponent/Index";

const {TextArea} = Input;
class DepartmentAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            number:1,
            id:"",
            loading: false,
            formItemLayout: {
                labelCol: { span: 2 },
                wrapperCol: { span: 14 },
            },
            formConfig:[
                {   type:"Input", 
                    label:"部门名称", 
                    name:"name",
                    rule:[{ required: true, message: '部门名称不能为空!' }]
                },
                {   type:"Select", 
                    label:"人员数量", 
                    name:"number",
                    min:1,
                    max:100,
                    rule:[
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
                    ]
                },
                {
                    type:"Button",
                    name:"Button",
                    htmlType:"submit"
                },
                {
                    type:"Radio",
                    name:"Status",
                    label:"禁启用"
                }
            ]
        }
    }
    onFinish = (value) => {
        this.setState({
            loading: true
        })
        this.state.id?this.onHandleEdit(value):this.onHandleAdd(value);
    }
    onHandleAdd = (value)=>{
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
    onHandleEdit = (value)=>{
        
        const id = this.state.id;
        const params = {...value, id};
        DepartmentEdit(params).then(response=>{
            this.setState({
                loading: false
            })
            message.success(response.data.message);
        }).catch( error=>{
            this.setState({
                loading: false
            })
            message.info(error.data.message)
            
        })
    }
    
    getDepartDetails=(id)=>{
        const params = {id}
        DepartmentDetails(params).then( response=>{
            const data = response.data.data;
            const {name, content , number, status  } = data;
            this.refs.form.setFieldsValue({
                name,content,number,status
            })


        }).catch(error=>{
            console.log(error);
        })
    }
    componentWillMount(){
        if(this.props.location.state){    
            this.setState({
                id:this.props.location.state.id
            })
        }
    }

    componentDidMount(){
        if(this.props.location.state){
            const id = this.props.location.state.id;
            this.getDepartDetails(id);
        }
    }
    render() {
        const { formItemLayout,status,loading,formConfig } = this.state;
        return (
            <>
                <FormComponent formConfig={formConfig}/>
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
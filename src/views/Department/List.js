import React, { Component } from 'react';
import { Form, Input, Button, Table, Switch, message,Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {GetDepartmentList, DeleteDepartmentList} from "@/api/department";
// import {GetDepartmentList, DeleteDepartmentList} from "../../api/department";
class DeaprtmentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:"",
            pageNumber: 1,
            pageSize:10,
            selectRowKeys:[],
            rowSelection:{},
            columns:[
                {title:"部门名称",dataIndex:"name",key:"name"},
                {   title:"禁启用",
                    dataIndex:"status",
                    key:"status",
                    render: (text,rowData)=>{
                        return(
                            <Switch 
                                checkedChildren="禁止" 
                                unCheckedChildren="启用" 
                                defaultChecked={rowData.status==="1"?true:false} />
                        )
                    }
                },
                {title:"人员数量",dataIndex:"number",key:"number"},
                {   title:"操作",
                    dataIndex:"operation",
                    key:"operation",
                    width:300,
                    render: (text,rowData)=>{

                        return(
                            <div className="inline-button">
                                <Button type="primary">编辑</Button>
                                <Button danger type="primary" onClick={ ()=>{this.handleSingleDelete(rowData)}}>删除</Button>
                            </div>
                        )
                    }
                }
            ],
            data:[]
        }
    }
    componentDidMount(){
        this.loadData();
    }
    handleSingleDelete = ({id})=>{
        Modal.confirm({
            title: "删除",
            icon: <ExclamationCircleOutlined/>,
            content: "确认要删除该条信息？",
            okText: "是",
            okType: "danger",
            cancelText: "否",
            onOk: () => {
                
        DeleteDepartmentList({id}).then(response=>{
            message.success(response.data.message);
        }).catch(error=>{console.log(error)})
        this.loadData();
            }
            ,
            onCancel() {
            },
        });


    }
    loadData = ()=>{
        let params = {
            pageNumber: this.state.pageNumber,
            pageSize: this.state.pageSize
        }
        if(this.state.name){
            params.name = this.state.name;
        }
        GetDepartmentList( params ).then( response=>{
            const data = response.data.data.data;
            this.setState({
                data
            })
        }).catch(err=>{console.log(err)})
        
    }
    onFinish = (value) => { 
        this.setState({
            pageSize: 10,
            pageNumber:1
        })
        this.loadData();
    }
    nameOnChange = (e)=>{
        let value = e.target.value;
        this.setState({
            name: value
        })
    }
    onCheckBox = (selectRowKeys)=>{
        this.setState({
            selectRowKeys
        },()=>{
            console.log('---',this.state.selectRowKeys);
        })
        console.log('ddd',this.state.selectRowKeys, selectRowKeys);
    }
    render() {
        const rowSelection = {
            onChange: this.onCheckBox
        }
        const {columns, data} = this.state;
        return (
            <>
                <Form
                    style={{marginBottom:"20px"}}
                    ref="form"
                    layout="inline"
                    onFinish={this.onFinish}
                    initialValues={this.state}
                >
                    <Form.Item
                        label="部门名称"
                        value="name"
                        onChange={this.nameOnChange}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                    </Form.Item>
                </Form>
                <Table 
                    rowSelection={rowSelection}
                    columns={columns}  
                    dataSource={data} 
                    rowKey="id"
                   bordered></Table>
            </>
        );
    }
}

export default DeaprtmentList;   
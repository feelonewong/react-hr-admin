import React, { Component } from 'react';
import { Form, Input, Button, Table } from "antd";
import {GetDepartmentList} from "../../api/department";
class DeaprtmentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNumber: 1,
            pageSize:10,
            rowSelection:{},
            columns:[
                {title:"部门名称",dataIndex:"name",key:"name"},
                {title:"禁启用",dataIndex:"status",key:"status"},
                {title:"人员数量",dataIndex:"number",key:"number"},
                {title:"操作",dataIndex:"operation",key:"operation",width:300}
            ],
            data:[
            ]
            
        }
    }
    componentDidMount(){
        this.loadData();
    }
    loadData = ()=>{
        let params = {
            pageNumber: this.state.pageNumber,
            pageSize: this.state.pageSize
        }
        GetDepartmentList( params ).then( response=>{
            const data = response.data.data.data;
            this.setState({
                data
            })
            console.log(data);
        }).catch(err=>{console.log(err)})
        
    }
    onFinish = () => { }
    render() {
        const {columns, data, rowSelection} = this.state;
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
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                    </Form.Item>
                </Form>

                <Table columns={columns}  dataSource={data} rowSelection={rowSelection} bordered></Table>
            </>
        );
    }
}

export default DeaprtmentList;   
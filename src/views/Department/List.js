import React, { Component } from "react";
import { Form, Input, Button,  Switch, message, Modal} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { DeleteDepartmentList, DepartmentStatus } from "@/api/department";
import { Link } from "react-router-dom";
//Component
import TableComponent from "@/components/tableComponent/TableComponent";
import requestURL from "@/api/requestURL";

class DeaprtmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pageNumber: 1,
      pageSize: 10,
      selectRowKeys: [],
     
      id:"",
      tableConfig:{
        hasCheckBox:true,
        btchButton: true,
        url: requestURL.departmentList,
        rowKey:"id",
        tHead: [
          { title: "部门名称", dataIndex: "name", key: "name" },
          {
            title: "禁启用",
            dataIndex: "status",
            key: "status",
            render: (text, rowData) => {
              return (
                <Switch
                  checkedChildren="启用"
                  unCheckedChildren="禁止"
                  loading={this.state.id === rowData.id}
                  defaultChecked={rowData.status === "1" ? true : false}
                  onChange={()=>{this.handleRadioChange(rowData)}}
                />
              );
            },
          },
          { title: "人员数量", dataIndex: "number", key: "number" },
          {
            title: "操作",
            dataIndex: "operation",
            key: "operation",
            width: 300,
            render: (text, rowData) => {
              return (
                <div className="inline-button">
                  <Button type="primary">
                    <Link to={{pathname:"/index/department/add",state:{id: rowData.id}}}>
                      编辑
                    </Link>
                   
                  </Button>
                  <Button
                    danger
                    type="primary"
                    onClick={() => {
                      this.handleSingleDelete(rowData);
                    }}
                  >
                    删除
                  </Button>
                </div>
              );
            },
          },
        ]
      },
     
    };
  }
  componentDidMount() {
  //  this.loadData();
  }
  // get child Component
  getChildRef = (ref)=>{
    this.TableComponent = ref;
  }

  handleSingleDelete = ({ id }) => {
    this.TableComponent.handleDelete({id})
  };
  handleRadioChange = (rowData)=>{
    const params = {
        id:rowData.id
    }
    if(rowData.status === '0' ){
        params.status = true;
    }else{
        params.status = false;
    }
    
    this.setState({
      id: rowData.id
    })
    DepartmentStatus(params).then( (response)=>{  
        this.setState({
          id: ""
        })
        message.info(response.data.message);
    }).catch(err=>{
        this.setState({
          id: ""
        })
        console.log(err)
    })
  }
  onFinish = (value) => {
    this.setState({
      pageSize: 10,
      pageNumber: 1,
    });
    this.loadData();
  };
  nameOnChange = (e) => {
    let value = e.target.value;
    this.setState({
      name: value,
    });
  };
  onCheckBox = (selectRowKeys) => {
    this.setState(
      {
        selectRowKeys,
      },
      () => {
      }
    );
  };
  render() {
   
    const { columns,   tableConfig } = this.state;
    return (
      <>
        <Form
          style={{ marginBottom: "20px" }}
          ref="form"
          layout="inline"
          onFinish={this.onFinish}
          initialValues={this.state}
        >
          <Form.Item label="部门名称" value="name" onChange={this.nameOnChange}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        <TableComponent   onRef={this.getChildRef}   config={tableConfig}  columns={columns} />
       
        {/* <Button onClick={()=>{this.handleBatchDelete()}}>批量删除</Button> */}
      </>
    );
  }
}

export default DeaprtmentList;

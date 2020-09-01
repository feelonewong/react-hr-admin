import React, { Component } from "react";
import { Form, Input, Button, Table, Switch, message, Modal} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { GetDepartmentList, DeleteDepartmentList, DepartmentStatus } from "@/api/department";
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
     
      tableLoading:false,
      id:"",
      tableConfig:{
        hasCheckBox:true,
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
  
  handleSingleDelete = ({ id }) => {
    Modal.confirm({
      title: "删除",
      icon: <ExclamationCircleOutlined />,
      content: "确认要删除该条信息？",
      okText: "是",
      okType: "danger",
      cancelText: "否",
      onOk: () => {
        DeleteDepartmentList({ id })
          .then((response) => {
            message.success(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
        this.loadData();
      },
      onCancel() {},
    });
  };
  handleBatchDelete = ()=>{
    let selectIdArray = this.state.selectRowKeys;
    if(!selectIdArray.length){
      message.error("请先选择数据在进行操作");
      return false;
    }else{
      Modal.confirm({
        title: "删除",
        icon: <ExclamationCircleOutlined />,
        content: "确认要删除该条信息？",
        okText: "是",
        okType: "danger",
        cancelText: "否",
        onOk: () => {
          const params = {
            id: selectIdArray.join()
          }
          DeleteDepartmentList(params)
            .then((response) => {
              message.success(response.data.message);
              this.setState({
                selectRowKeys:[]
              })
            })
            .catch((error) => {
              
              console.log(error);
            });
          this.loadData();
        },
        onCancel() {},
      });
    }
  }
  loadData = () => {
    let params = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
    };
    if (this.state.name) {
      params.name = this.state.name;
    }
    this.setState({
      tableLoading: true
    })
    GetDepartmentList(params)
      .then((response) => {
        const data = response.data.data.data;
        this.setState({
          data,
          tableLoading: false
        })
      })
      .catch((err) => {
        this.setState({
          tableLoading: false
        })
        console.log(err);
      });
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
   
    const { columns,  tableLoading, tableConfig } = this.state;
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
        <TableComponent    config={tableConfig}  columns={columns} />
        <Table
          loading = {tableLoading}
       
        ></Table>
        <Button onClick={()=>{this.handleBatchDelete()}}>批量删除</Button>
      </>
    );
  }
}

export default DeaprtmentList;

import React, { Component } from "react";
import { Button,  Switch, message} from "antd";
import { DepartmentStatus } from "@/api/department";
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
        <TableComponent   onRef={this.getChildRef}   config={tableConfig}  columns={columns} />
      </>
    );
  }
}

export default DeaprtmentList;

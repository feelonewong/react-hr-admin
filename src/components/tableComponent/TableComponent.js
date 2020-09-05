import React, { Component } from "react";
import { Table, Row, Col, Button, Pagination, message, Modal } from "antd";
import { GetDepartmentList } from "@/api/department";
import {TableDelete} from "@/api/common";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import requestURL from "@/api/requestURL";
import propTypes from "prop-types";

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      tableLoading: false,
      pageSize: 10,
      data: [],
      columns: [],
      id: "",
      totalCount:0,
      selectRowKeys: [],
    };
  }
  componentDidMount() {
    this.setState({
      columns: this.props.config.tHead,
    });
    this.loadData();
    this.props.onRef(this);
  }
  loadData = () => {
    this.setState({
      tableLoading: true,
    });
    let params = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      url: this.props.config.url,
    };

    GetDepartmentList(params)
      .then((response) => {
        const data = response.data.data.data;
        const totalCount = response.data.data.total;
        this.setState({
          data,
          totalCount,
          tableLoading: false
        });
      })
      .catch((err) => {
        this.setState({
          tableLoading: false
        })
      });
  };
  onCheckbox = (selectRowKeys) => {
    this.setState(
      {
        selectRowKeys,
      },
      () => {
      }
    );
  };
  handleDelete = (callBackParams)=>{
       Modal.confirm({
      title: "删除",
      icon: <ExclamationCircleOutlined />,
      content: "确认要删除该条信息？",
      okText: "是",
      okType: "danger",
      cancelText: "否",
      onOk: () => {
      let {id} = callBackParams; 
      const params = {
        id: id,
        url: requestURL.tableDelete
      }
        TableDelete(params)
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
  onPaginationChange = (value) => {
    this.setState({
      pageNumber:value
    },()=>{
      console.log(this.state.pageNumber,this.state.pageSize);
      this.loadData();
    })
  }
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
            id: selectIdArray.join(),
            url: requestURL.tableDelete
          }
          TableDelete(params)
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
  onShowSizeChange = (current,value)=>{
    this.setState({
      pageSize:value
    },()=>{
      this.onPaginationChange(1);
    })
  }
  render() {
    const { columns, data, tableLoading, totalCount } = this.state;
    const { hasCheckBox, rowKey, btchButton } = this.props.config;
    const rowSelection = {
      onChange: this.onCheckbox,
    };
    return (
      <>
        <Table
          rowSelection={hasCheckBox ? rowSelection : null}
          rowKey={rowKey || "id"}
          loading={tableLoading}
          pagination={false}
          dataSource={data}
          columns={columns}
          bordered
        ></Table>
        <Row justify="space-between" style={{ marginTop: "20px" }}>
          <Col span={4} >
            {btchButton && <Button type="danger" onClick={() => { this.handleBatchDelete() }}>批量删除</Button>}
          </Col>
          <Col span={20}  >
            <Row justify="end">
              <Pagination 
                  onShowSizeChange={this.onShowSizeChange}
                  showQuickJumper 
                  showSizeChanger
                  defaultCurrent={1} 
                  showTotal={total => `Total ${totalCount} items`}
                  onChange={this.onPaginationChange} />
            </Row>

          </Col>
        </Row>
      </>
    );
  }
}
TableComponent.propTypes = {
  config: propTypes.object
}
export default TableComponent;

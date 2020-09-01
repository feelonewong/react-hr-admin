import React, { Component } from "react";
import { Table } from "antd";
import { GetDepartmentList } from "@/api/department";

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
      selectRowKeys: [],
    };
  }
  componentDidMount() {
    this.setState({
      columns: this.props.config.tHead,
    });
    this.loadData();
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
        this.setState({
          data,
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
        console.log(this.state.selectRowKeys);
      }
    );
  };
  render() {
    const { columns, data, tableLoading } = this.state;
    const { hasCheckBox, rowKey } = this.props.config;
    const rowSelection = {
      onChange: this.onCheckbox,
    };
    return (
      <>
        <Table
          rowSelection={hasCheckBox ? rowSelection : null}
          rowKey={rowKey || "id"}
          loading={tableLoading}
          dataSource={data}
          columns={columns}
          bordered
        ></Table>
      </>
    );
  }
}

export default TableComponent;

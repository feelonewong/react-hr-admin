import React, { Component } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import { GetDepartmentList } from "@/api/department";
import { TableDelete } from "@/api/common";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import requestURL from "@/api/requestURL";
import propTypes from "prop-types";
import TableBasis from "./TableUI";
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
      totalCount: 0,
      name: "",
      selectRowKeys: [],
      keywords:""
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
      name:this.state.keywords,
    };

    GetDepartmentList(params)
      .then((response) => {
        const data = response.data.data.data;
        const totalCount = response.data.data.total;
        this.setState({
          data,
          totalCount,
          tableLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          tableLoading: false,
        });
      });
  };
  onCheckbox = (selectRowKeys) => {
    this.setState(
      {
        selectRowKeys,
      },
      () => {}
    );
  };
  handleDelete = (callBackParams) => {
    Modal.confirm({
      title: "删除",
      icon: <ExclamationCircleOutlined />,
      content: "确认要删除该条信息？",
      okText: "是",
      okType: "danger",
      cancelText: "否",
      onOk: () => {
        let { id } = callBackParams;
        const params = {
          id: id,
          url: requestURL.tableDelete,
        };
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
    this.setState(
      {
        pageNumber: value,
      },
      () => {
        console.log("pagination");
        this.loadData();
      }
    );
  };
  handleBatchDelete = () => {
    let selectIdArray = this.state.selectRowKeys;
    if (!selectIdArray.length) {
      message.error("请先选择数据在进行操作");
      return false;
    } else {
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
            url: requestURL.tableDelete,
          };
          TableDelete(params)
            .then((response) => {
              message.success(response.data.message);
              this.setState({
                selectRowKeys: [],
              });
            })
            .catch((error) => {});
          this.loadData();
        },
        onCancel() {},
      });
    }
  };
  onShowSizeChange = (current, value) => {
    this.setState(
      {
        pageSize: value,
      },
      () => {
        this.onPaginationChange(1);
      }
    );
  };

  onFinish = (value) => {
    this.setState({
      keywords:value.name
    })
    if (this.state.tableLoading) {
      return false;
    }
    this.setState({
      pageSize: 10,
      pageNumber: 1,
    });
    this.loadData();
  };
  render() {
    const { columns, data, tableLoading, totalCount } = this.state;
    const { hasCheckBox } = this.props.config;
    const rowSelection = {
      onChange: this.onCheckbox,
    };
    return (
      <>
        <Form
          layout="inline"
          onFinish={this.onFinish}
          style={{ marginBottom: "20px" }}
        >
          <Form.Item label="部门名称" name="name">
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>

        <TableBasis
          columns={columns}
          dataSource={data}
          btchButton={this.props.config.btchButton}
          handleBatchDelete={() => {
            this.handleBatchDelete();
          }}
          changePageCurrent={this.onPaginationChange}
          onShowSizeChange={this.onShowSizeChange}
          totalCount={totalCount}
          tableLoading={tableLoading}
          rowSelection={hasCheckBox ? rowSelection : null}
        />
      </>
    );
  }
}
TableComponent.propTypes = {
  config: propTypes.object,
};
export default TableComponent;

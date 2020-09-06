import React, { Component } from "react";
import { Table, Pagination, Row, Col, Button } from "antd";

class TableBasis extends Component {
  render() {
    const {
      columns,
      dataSource,
      totalCount,
      btchButton,
      handleBatchDelete,
      onShowSizeChange,
      changePageCurrent,
      rowSelection,
     
      tableLoading,
    } = this.props;
    return (
      <>
      

        <Table
          size="small"
          rowKey={"id"}
          pagination={false}
          dataSource={dataSource}
          columns={columns}
          loading={tableLoading}
          rowSelection={rowSelection}
          bordered
        />
        <Row justify="space-between" style={{ marginTop: "20px" }}>
          <Col span={4}>
            {btchButton && (
              <Button type="danger" onClick={handleBatchDelete}>
                批量删除
              </Button>
            )}
          </Col>
          <Col span={20}>
            <Row justify="end">
              <Pagination
                showQuickJumper
                showSizeChanger
                onChange={changePageCurrent}
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={1}
                total={totalCount}
                showTotal={(total) => `Total ${totalCount} items`}
              />
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

export default TableBasis;

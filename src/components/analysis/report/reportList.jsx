import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Table, message, Popconfirm, Menu, Dropdown, Icon } from 'antd';

class AnalysisReportList extends Component {

  constructor(props){
    super(props);
  }

  render(){

    //结果列表结构
    const columns = [{
        title: '场景名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '报告名称',
        dataIndex: 'reportName',
        key: 'reportName',
      }, {
        title: '测试版本',
        dataIndex: 'version',
        key: 'version',
      }, {
        title: '操作',
        key: 'operation',
        dataIndex: 'allresult',
        render: (text, record) => (
          <p>
            <a onClick={() => this.props.onEditItem(record)}>编辑</a>
            &nbsp;
            <Popconfirm title="确定要删除吗？" onConfirm={() => this.props.onDeleteItem(record.id)}>
              <a>删除</a>
            </Popconfirm>
          </p>
        )
      }];

    // 定义分页对象
    const pagination = {
      total: this.props.total,
      current: this.props.current,
      pageSize: 10,
      onChange: (page)=>{this.props.onPageChange(page)},
    };

    return (
      <div>
        <Table
          bordered
          title={() => '场景案例测试报告'}
          footer={() => ''}
          columns={columns}
          dataSource={this.props.dataSource}
          loading={this.props.loading}
          rowKey={record => record.id}
          pagination={pagination}
        />
      </div>
    );
  }
};

AnalysisReportList.PropTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default AnalysisReportList;


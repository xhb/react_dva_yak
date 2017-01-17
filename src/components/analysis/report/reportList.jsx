import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Table, message, Popconfirm, Menu, Dropdown, Icon, Tag } from 'antd';

class AnalysisReportList extends Component {

  constructor(props){
    super(props);
  }

  render(){

    //结果列表结构
    const columns = [{
        title: '场景名称',
        dataIndex: 'scensName',
        key: 'scensName',
      },{
        title: '报告名称',
        dataIndex: 'reportName',
        key: 'reportName',
      },{
        title: '测试版本',
        dataIndex: 'testVersion',
        key: 'testVersion',
      },{
        title: '选用数据',
        key: 'selectTime',
        dataIndex: 'selectTime',
        render: (text, record) => {
          return text.map((e)=>( <Tag key={e} >{e}</Tag> ));
        }
      },{
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <p>
            <a onClick={() => this.props.previewReport(record)}>预览</a>
            &nbsp;
            <a onClick={() => this.props.onEditItem(record)}>编辑</a>
            &nbsp;
            <Popconfirm title="确定要删除吗？" onConfirm={() => this.props.onDeleteItem(record._id)}>
              <a>删除</a>
            </Popconfirm>
          </p>
        )
      }];

    return (
      <div>
        <Table
          bordered
          title={() => '场景案例测试报告'}
          footer={() => ''}
          columns={columns}
          dataSource={this.props.dataSource}
          loading={this.props.loading}
          rowKey={record => record._id}
        />
      </div>
    );
  }
};

AnalysisReportList.PropTypes = {
  //删除一份报告
  onDeleteItem: PropTypes.func,
  //编辑一份报告
  onEditItem: PropTypes.func,
  //预览一份报告:
  previewReport: PropTypes.func,
  //全部报告列表数据源
  dataSource: PropTypes.array,
  //访问api时过场加载
  loading: PropTypes.any,
};

export default AnalysisReportList;


import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Table, message, Popconfirm } from 'antd';

class AnalysisResultList extends Component {

  constructor(props){
    super(props);
  }

  render(){

    //结果列表结构

    const columns = [{
        title: '案例名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '结果数量',
        dataIndex: 'counts',
        key: 'counts',
      }, {
        title: '最新结果',
        dataIndex: 'lastresult',
        key: 'lastresult',
        render: (text, record) => (
          //http://www.jianshu.com/p/9780a302e509
          <a onClick={()=>this.props.handlePreview(record)} >{text}</a>
        ),

      }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <p>
            <a onClick={()=>{}}>查看全部结果</a>
          </p>
        ),
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
          title={() => '测试结果列表'}
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

}

export default AnalysisResultList;


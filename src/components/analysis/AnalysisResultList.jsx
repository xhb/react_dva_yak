import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Table, message, Popconfirm, Menu, Dropdown, Icon } from 'antd';
import styles from "./AnalysisResultList.less";

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
        dataIndex: 'allresult',
        render: (text, record) => {
          let allResult = [];
          record.allresult.forEach((result, index)=>{
            let newRecord = {};
            newRecord.name = record.name;
            newRecord.lastresult = result
            allResult.push(
              <Menu.Item key={index}>
                <a onClick={()=>this.props.handlePreview(newRecord)}>{result}</a>
              </Menu.Item>
            );
          });

          const menu = (
            <Menu>
              {allResult}
            </Menu>
          );

          return(
            <div className={styles.operation}>
              <Dropdown className={styles.item} overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  查看全部结果<Icon type="down" />
                </a>
              </Dropdown>
              <span className={styles.item} >
                <a className="ant-dropdown-link" onClick={()=>this.props.handleReportMaker(record.name)} >
                  制作对比报告<Icon type="swap" />
                </a>
              </span>
            </div>
          );

        },
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

//属性定义
AnalysisResultList.propTypes = {
  //处理结果预览浮动层
  handlePreview: PropTypes.func,
  //处理表格的分页
  onPageChange: PropTypes.func,
  //处理对比报告链接
  handleReportMaker: PropTypes.func,
  //测试案例表格数据源头
  dataSource: PropTypes.array,
  //获取测试案例表格数据时的过度状态
  loading: PropTypes.any,
  //总的测试案例数目
  total: PropTypes.any,
  //当前的分页在哪一页
  current: PropTypes.any,
};


export default AnalysisResultList;


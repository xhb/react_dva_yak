import { Table, Select, Alert, Tooltip, Button } from 'antd';
import React, { Component, PropTypes } from 'react';
import styles from './YTable.less';

const Option = Select.Option;

class YTable extends Component {

  constructor(props){
    super(props);
  }

  handleChange(value){
    console.log(value);
  }

  render(){
    let table_cols = this.props.columns
    let columns = table_cols.map((item, i)=>{
      return({ key: i, title: item, width: 150, dataIndex: item });
    });

    let data = this.props.data
    let scroll_size = columns.length * 150

    let options = table_cols.map((item)=>{
      return( <Option key={item}>{item}</Option> );
    });

    const GenColumnsCheckboxs = ()=>{
      return(
        <div className={styles.normal}>
          <div className={styles.search}>
            <Select
              multiple
              style={{ width: '40%' }}
              placeholder="只显示哪些列："
              onChange={this.handleChange}
            >
              {options}
            </Select>
            <Tooltip placement="topLeft" title="支持多选列表项，然后重画图表">
              <Button className={styles.replotbutton}>重画表格</Button>
            </Tooltip>
          </div>
        </div>
      );
    };

    return(
      <div className="ytable">
        <GenColumnsCheckboxs />
        <Table
          columns={columns}
          bordered
          dataSource={data}
          pagination={{ pageSize: 50 }}
          scroll={{ x: scroll_size, y: 400 }}
          size="middle"
        />
      </div>
    );
  }

}

export default YTable;


import {Brush, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip as RTooltip} from 'recharts';
import { Table, Select, Alert, Tooltip, Button } from 'antd';
import React, { Component, PropTypes } from 'react';
import styles from './stackYTable.less';
import _ from "underscore";
import randomcolor from "randomcolor";

const Option = Select.Option;

class StackYTable extends Component {

  constructor(props){
    super(props);
  }

  getRandomColor(){
    //return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6);
    return randomcolor({luminosity: 'dark'});
  }

  genBarchartData(){
    let selectRowsIndexs = this.props.selectedRowKeys;
    let filterData = this.props.data.filter((item, index, obj) => {
      return (selectRowsIndexs.indexOf(index.toString()) > -1);
    });
    let XAxis = _.keys(filterData[0])[0];
    let parseChartData = filterData.map((item)=>{
      //把过滤出来的数据的值从字符串数据转化成为数字
      return(
        _.mapObject(item, (val, key)=>{
          if( key != XAxis){
            // return(Number(val));
            let result_value = parseFloat(val);
            if( !isFinite(result_value) || isNaN(result_value) ){
              result_value = 0;
            }
            return(result_value);
          }else{
            return val;
          }
        })
      )
    });

    console.log(parseChartData);
    return parseChartData;
  }

  genBarchartXAxis(){
    return(
       <XAxis dataKey={this.props.selectCols[0]}/>
    );
  }

  genBarchartTiptop(){
    let yAxisTiptop = [];
    this.props.timestamp.forEach((time, index)=>{
      let color = this.getRandomColor();
      for(let i = 1; i < this.props.selectCols.length; i++){
        yAxisTiptop.push(
          <Bar
            key={i}
            dataKey={this.props.selectCols[i] + "_" + time}
            stackId={"a" + i.toString()}
            fill={color}
          />
        );
      }
    });
    console.log(yAxisTiptop);
    return(yAxisTiptop);
  }

  render(){

    let table_cols = this.props.selectCols
    let options = table_cols.map((item)=>{
      return( <Option key={item}>{item}</Option> );
    });

    let selectRowData = this.props.selectedRowKeys;
    let sourcedata = selectRowData.map((e)=>{
      return this.props.data[e]
    });

    return(
      <div className={styles.ytableWrapper}>
        <div className={this.props.showTable == "true" ? styles.yTableShow : styles.yTableHide} >
          <Table
            columns={
              this.props.selectCols.map((item, i)=>{
                return({ key: i, title: item, width: 150, dataIndex: item });
              })
            }
            rowKey={(record, index)=>index}
            bordered
            dataSource={sourcedata}
            pagination={{ pageSize: 200}}
            scroll={
              { x: this.props.selectCols.length * 150, y: 400 }
            }
            size="middle"
          />
        </div>
        <div className={ this.props.showBar == "true" ? styles.yBarShow : styles.yBarHide }>
          <BarChart
            stackOffset="sign"
            width={1000}
            height={400}
            data={ this.genBarchartData.bind(this)() }
            margin={{top: 5, right: 0, left: 0, bottom: 5}} >
           {this.genBarchartXAxis.bind(this)()}
           <YAxis/>
           <CartesianGrid strokeDasharray="3 3"/>
           <RTooltip/>
           <Legend />
           {this.genBarchartTiptop.bind(this)()}
           <Brush dataKey={this.props.selectCols[0]} height={30} stroke="#8884d8"/>
          </BarChart>
        </div>
      </div>
    );
  }

}

//属性定义
StackYTable.PropTypes = {
  //预览报告数据
  data: PropTypes.array,
  //表格中选择哪些 行 作为画柱状图的数据
  selectedRowKeys: PropTypes.array,
  //表格中选择哪些 列 作为画柱状图的数据
  selectCols: PropTypes.array,
  //控制表格图的显示和关闭
  showTable: PropTypes.bool,
  //控制柱状图的显示和关闭
  showBar: PropTypes.bool,
  //表格分页数当前选中的页数
  currentTablePage: PropTypes.any
}

export default StackYTable;


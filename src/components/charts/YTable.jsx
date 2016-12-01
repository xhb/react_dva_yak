import {Brush, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip as RTooltip} from 'recharts';
import { Table, Select, Alert, Tooltip, Button } from 'antd';
import React, { Component, PropTypes } from 'react';
import styles from './YTable.less';
import _ from "underscore";

const Option = Select.Option;
let   YtableSelectColumns = [];

class YTable extends Component {

  constructor(props){
    super(props);
    YtableSelectColumns = this.props.columns;
    this.state = {
      selectCols: this.props.columns,
      showTable: true,
      showBar: false
    };
  }

  handleChange(value){
    YtableSelectColumns = value;
  }

  handleTableReplot(){
    this.setState({
      ...this.state,
      selectCols: YtableSelectColumns,
      showTable: true,
      showBar: false
    });
  }

  handleBarPlot(){
    this.setState({
      ...this.state,
      showTable: false,
      showBar: true
    });
  }

  getRandomColor(){
    return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6);
  }

  genBarchartData(){
    let barChartData = this.props.data.map(item=>_.pick(item, ...this.state.selectCols));
    let XAxis = _.keys(barChartData[0])[0];
    let parseChartData = barChartData.map((item)=>{
      return(
        _.mapObject(item, (val, key)=>{
          if( key != XAxis){
            // return(Number(val));
            return(parseFloat(val));
          }else{
            return val;
          }
        })
      )
    });
    return parseChartData;
  }

  genBarchartXAxis(){
    return(
       <XAxis dataKey={this.state.selectCols[0]}/>
    );
  }

  genBarchartTiptop(){
    let yAxisTiptop = [];
    for(let i = 1; i < this.state.selectCols.length; i++){
      yAxisTiptop.push(<Bar dataKey={this.state.selectCols[i]} fill={this.getRandomColor()}/>);
    }
    return(yAxisTiptop);
  }

  render(){

    let data = this.props.data
    let table_cols = this.props.columns
    let options = table_cols.map((item)=>{
      return( <Option key={item}>{item}</Option> );
    });

    const GenColumnsCheckboxs = ()=>{
      return(
        <div className={styles.normal}>
          <div className={styles.search}>
            <Select
              multiple
              style={{ width: '50%' }}
              placeholder="只显示哪些列："
              onChange={this.handleChange}
              showSearch={true}
            >
              {options}
            </Select>
            <Tooltip placement="topLeft" title="支持多选列表项，然后重画表格">
              <Button onClick={this.handleTableReplot.bind(this)} type="primary" className={styles.replotbutton}>重画表格</Button>
            </Tooltip>
            <Tooltip placement="topLeft" title="支持多选列表项，按照首列x轴，生成柱状图">
              <Button onClick={this.handleBarPlot.bind(this)} type="primary" className={styles.replotbutton}>生成图形</Button>
            </Tooltip>
          </div>
        </div>
      );
    };

    return(
      <div className={styles.ytableWrapper}>
        <GenColumnsCheckboxs />
        <div className={this.state.showTable ? styles.yTableShow : styles.yTableHide} >
          <Table
            columns={
              this.state.selectCols.map((item, i)=>{
                return({ key: i, title: item, width: 150, dataIndex: item });
              })
            }
            bordered
            dataSource={data}
            pagination={{ pageSize: 50 }}
            scroll={
              { x: this.state.selectCols.length * 150, y: 400 }
            }
            size="middle"
          />
        </div>
        <div className={ this.state.showBar ? styles.yBarShow : styles.yBarHide }>
          <BarChart
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
           <Brush dataKey={this.state.selectCols[0]} height={30} stroke="#8884d8"/>
          </BarChart>
        </div>
      </div>
    );
  }

}

export default YTable;


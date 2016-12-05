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
      yTableNS:
        {
          //这里有个坑，不能默认全选，不然onRowsSelectChange的参数会有问题
          selectedRowKeys: [],
          selectCols: this.props.columns,
          showTable: true,
          showBar: false,
          currentTablePage: 1
        }
    };
  }

  handleChange(value){
    YtableSelectColumns = value;
  }

  handleTableReplot(){
    this.setState({
      yTableNS: {
        ...this.state.yTableNS,
        selectCols: YtableSelectColumns,
        showTable: true,
        showBar: false
      }
    });
  }

  handleBarPlot(){
    this.setState({
      yTableNS: {
        ...this.state.yTableNS,
        showTable: false,
        showBar: true
      }
    });
  }

  getRandomColor(){
    return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6);
  }

  genBarchartData(){
    let selectRowsIndexs = this.state.yTableNS.selectedRowKeys;
    let filterData = this.props.data.filter(function(item, index, obj) {
      return (selectRowsIndexs.indexOf(index) > -1);
    });
    let barChartData = filterData.map(item=>_.pick(item, ...this.state.yTableNS.selectCols));
    let XAxis = _.keys(barChartData[0])[0];
    let parseChartData = barChartData.map((item)=>{
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
    return parseChartData;
  }

  genBarchartXAxis(){
    return(
       <XAxis dataKey={this.state.yTableNS.selectCols[0]}/>
    );
  }

  genBarchartTiptop(){
    let yAxisTiptop = [];
    for(let i = 1; i < this.state.yTableNS.selectCols.length; i++){
      yAxisTiptop.push(<Bar dataKey={this.state.yTableNS.selectCols[i]} fill={this.getRandomColor()}/>);
    }
    return(yAxisTiptop);
  }

  render(){

    let table_cols = this.props.columns
    let options = table_cols.map((item)=>{
      return( <Option key={item}>{item}</Option> );
    });

    let row_Selection = {
      selectedRowKeys: this.state.yTableNS.selectedRowKeys,
      onChange: (selectRows) => {
                  this.setState({
                    yTableNS: {
                      ...this.state.yTableNS,
                      selectedRowKeys: selectRows
                    }
                  });
                },
    }

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
        <div className={this.state.yTableNS.showTable ? styles.yTableShow : styles.yTableHide} >
          <Table
            columns={
              this.state.yTableNS.selectCols.map((item, i)=>{
                return({ key: i, title: item, width: 150, dataIndex: item });
              })
            }
            rowKey={(record, index)=>index}
            bordered
            dataSource={this.props.data}
            pagination={{ pageSize: 200}}
            scroll={
              { x: this.state.yTableNS.selectCols.length * 150, y: 400 }
            }
            rowSelection={row_Selection}
            size="middle"
          />
        </div>
        <div className={ this.state.yTableNS.showBar ? styles.yBarShow : styles.yBarHide }>
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
           <Brush dataKey={this.state.yTableNS.selectCols[0]} height={30} stroke="#8884d8"/>
          </BarChart>
        </div>
      </div>
    );
  }

}

export default YTable;


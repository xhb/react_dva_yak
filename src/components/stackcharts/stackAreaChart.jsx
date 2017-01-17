
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import _ from "underscore";
import {Spin, Alert, Icon, Tag} from 'antd';
import randomcolor from "randomcolor";

class StackAreaChart extends Component {

  constructor(props){
    super(props);
  }

  getRandomColor(){
    //return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6);
    return randomcolor({luminosity: 'dark'});
  }

  render () {

    if(this.props.data.length < 1){
      return(<div style={{margin: 16, textAlign: 'center'}}><Icon type="loading"/>加载数据...</div>)
    };

    const record = this.props.data[0];

    let all_keys = _.keys(record);
    const time = _.first(all_keys);

    let GenYAxis = [];
    _.rest(all_keys).forEach( (e) => {
      let color = this.getRandomColor();
      GenYAxis.push(
        <Area
          type='monotone'
          dataKey={e}
          stroke={color}
          fill={color}
        />
      );
    });

    //把画图数据中的string类型转化为int类型
    let newdata = this.props.data.map( (record) => {
      return _.mapObject(record, (val, key)=>{
        if(key!=time){
          let parseResult = parseInt(val);
          if(!isFinite(parseResult) || isNaN(parseResult)){
            parseResult = 0;
          }
          return parseResult;
        }else{
          return val;
        }
      })
    });

    //生成图表标签
    let lable = _.last(all_keys);
    lable = _.first(lable.split("_"));

    return (
      <div >
        <div style={{marginLeft: 16, margin: 10}}>
          <Tag color="#108ee9"><Icon type="tags"/>{lable}</Tag>
        </div>
        <AreaChart
          width={1000}
          height={200}
          data={newdata}
          margin={{top: 10, right: 0, left: 0, bottom: 0}}
        >
          <XAxis dataKey={time}/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          {GenYAxis}
        </AreaChart>
      </div>
    );
  }
}

//属性定义
StackAreaChart.PropTypes = {
  //区域时序图的画图数据
  data: PropTypes.array
}

// data数据格式:
// [
//   { time: "xxxxxx", tpm_日期1: "123", tpm_日期2: "456"},
//   { time: "xxxxxx", tpm_日期1: "124", tpm_日期2: "467"},
// ]

export default StackAreaChart;

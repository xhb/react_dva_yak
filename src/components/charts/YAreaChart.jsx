
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import _ from "underscore";
import {Spin, Alert} from 'antd';

class YAreaChart extends Component {

  constructor(props){
    super(props);
  }

  render () {
    if(this.props.data.length < 1){ return(<div>"no data"</div>) };
    const record = this.props.data[0];
    const time = _.keys(record)[0];
    const show = _.keys(record)[1];

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

    return (
      <AreaChart width={1000} height={200} data={newdata}
            margin={{top: 10, right: 0, left: 0, bottom: 0}}>
        <XAxis dataKey={time}/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Area type='monotone' dataKey={show} stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
    );
  }
}

export default YAreaChart;

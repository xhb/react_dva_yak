
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import _ from "underscore";
import {Spin, Alert} from 'antd';

// const data = [
//       {Time: '00:10:01', uv: 4000},
//       {Time: '00:10:02', uv: 3000},
//       {Time: '00:10:03', uv: 2000},
//       {Time: '00:10:04', uv: 2780},
//       {Time: '00:10:05', uv: 1890},
//       {Time: '00:10:06', uv: 2390},
//       {Time: '00:10:07', uv: 3490},
// ];

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
          return parseInt(val);
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

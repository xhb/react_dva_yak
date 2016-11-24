import React, { Component, PropTypes } from 'react';
import MainLayout from '../components/mainlayout/MainLayout';
import YAreaChart from '../components/charts/YAreaChart';

class  CSVChart extends Component {

  constructor(props){
     super(props);
  }

  render(){
    return(
      <MainLayout>
        <YAreaChart/>
      </MainLayout>
    );
  }

}

export default CSVChart;

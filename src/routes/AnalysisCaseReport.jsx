import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MainLayout from '../components/mainlayout/MainLayout';
import AnalysisReportList from '../components/analysis/report/reportList';

class AnalysisCaseReport extends Component {

  constructor(props){
     super(props);
  }

  render(){

    return(
      <MainLayout location={this.props.location}>
        <AnalysisReportList />
      </MainLayout>
    );
  }

}

function mapStateToProps( { AnalysisReportMaker } ){
  return { AnalysisReportMaker };
}

export default connect(mapStateToProps)(AnalysisCaseReport);

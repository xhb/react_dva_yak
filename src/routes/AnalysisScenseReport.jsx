import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MainLayout from '../components/mainlayout/MainLayout';
import AnalysisReportList from '../components/analysis/report/reportList';

class AnalysisScenseReport extends Component {

  constructor(props){
     super(props);
  }

  render(){

    const {
      reportList,
      loading,
      previewModalVisible,
      previewModalTital,
      originData,
    } = this.props.AnalysisReportMaker

    return(
      <MainLayout location={this.props.location}>
        <AnalysisReportList
           dataSource = {reportList}
        />
      </MainLayout>
    );
  }

}


function mapStateToProps( { AnalysisReportMaker } ){
  return { AnalysisReportMaker };
}

export default connect(mapStateToProps)(AnalysisScenseReport);

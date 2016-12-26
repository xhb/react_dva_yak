import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MainLayout from '../components/mainlayout/MainLayout';
import AnalysisReportList from '../components/analysis/report/reportList';
import ReportAdd from "../components/analysis/report/reportAdd";
import ReportGenModal from "../components/analysis/report/reportGenModal";

class AnalysisScenseReport extends Component {

  constructor(props){
    super(props);
  }

  render(){

    const {
      item,
      reportList,
      loading,
      modalVisible,
      previewModalVisible,
      previewModalTital,
      originData,
    } = this.props.AnalysisReportMaker;

    const dispatch = this.props.dispatch;

    const analysisReportListProps = {
      dataSource: reportList,
      loading,
      previewModalVisible,
      previewModalTital,
      originData,
    };

    const addReportProps = {
      //点击添加报告按钮
      onAdd(){
        dispatch({
          type: 'AnalysisReportMaker/showGenModal'
        });
      },

    };

    const reportGenModalProps = {
      item,
      modalVisible,
      //步骤1成功的回调
      onStepOne(data){
        console.log(data);
      },
      //步骤2成功的回调
      onStepTwo(data){

      },
      //步骤3成功的回调
      onStepThere(data){

      },
      //浮动层的取消
      onCancel(){
        dispatch({
          type: 'AnalysisReportMaker/hideGenModal'
        });
      }
    };

    return(
      <MainLayout location={this.props.location}>
        <ReportAdd {...addReportProps} />
        <AnalysisReportList {...analysisReportListProps} />
        <ReportGenModal {...reportGenModalProps} />
      </MainLayout>
    );
  }

}


function mapStateToProps( { AnalysisReportMaker } ){
  return { AnalysisReportMaker };
}

export default connect(mapStateToProps)(AnalysisScenseReport);

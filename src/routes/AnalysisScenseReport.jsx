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
      scensName,
      resultDateList,
      resultDate,
      tmpData
    } = this.props.AnalysisReportMaker;

    const dispatch = this.props.dispatch;

    const analysisReportListProps = {
      dataSource: reportList,
      loading,
      previewModalVisible,
      previewModalTital,
      scensName,
      onDeleteItem(id){
        dispatch({
          type: 'AnalysisReportMaker/delete',
          payload: id
        });
      }
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
      scensName,
      resultDateList,
      resultDate,
      tmpData,

      //步骤1成功的回调
      onStepOne(data){
        dispatch({
          type: 'AnalysisReportMaker/loadStepData',
          payload: data
        })
      },

      //步骤2成功的回调
      onStepTwo(data){
        dispatch({
          type: 'AnalysisReportMaker/loadStepData',
          payload: { chart: data }
        })
      },

      //步骤3成功的回调
      onStepThere(data){
        dispatch({
          type: 'AnalysisReportMaker/loadStepData',
          payload: { selectTime: data }
        });
        dispatch({
          type: 'AnalysisReportMaker/commitStepData'
        });
      },

      //浮动层的取消
      onCancel(){
        dispatch({
          type: 'AnalysisReportMaker/hideGenModal'
        });
      },

      //为第二步骤提供查询场景数据的接口
      onQueryChart(date){
        dispatch({
          type: 'AnalysisReportMaker/queryChartData',
          payload: date
        });
      },

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

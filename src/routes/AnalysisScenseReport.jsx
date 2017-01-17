import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MainLayout from '../components/mainlayout/MainLayout';
import AnalysisReportList from '../components/analysis/report/reportList';
import ReportAdd from "../components/analysis/report/reportAdd";
import ReportGenModal from "../components/analysis/report/reportGenModal";
import ReportView from "../components/analysis/report/preview/reportView";

class AnalysisScenseReport extends Component {

  constructor(props){
    super(props);
  }

  render(){

    const {
      //测试列表模块
      item,
      reportList,
      loading,
      modalVisible,

      //测试报告表单模块
      previewModalVisible,
      previewModalTital,

      scensName,
      resultDateList,
      resultDate,
      tmpData,
      commitType,

      //测试报告结果预览
      preVisible,
      record,
      drawData

    } = this.props.AnalysisReportMaker;

    const dispatch = this.props.dispatch;

    const analysisReportListProps = {

      dataSource: reportList,
      loading,
      previewModalVisible,
      previewModalTital,
      scensName,

      //删掉一份场景报告
      onDeleteItem(id){
        dispatch({
          type: 'AnalysisReportMaker/delete',
          payload: id
        });
      },

      //编辑一份场景报告
      onEditItem(record){
        //更新数据更新模式为update
        dispatch({
          type: 'AnalysisReportMaker/changeCommitType',
          payload: {
            commitType: 'update'
          }
        });
        //填充item临时数据
        dispatch({
          type: 'AnalysisReportMaker/updateItem',
          payload: {
            data: record
          }
        });
        //弹出浮动层
        dispatch({
          type: 'AnalysisReportMaker/showGenModal'
        });
      },

      //预览一个小场景的测试报告
      previewReport(record){
        console.log(record);
        dispatch({
          type: "AnalysisReportMaker/fetchPreviewData",
          payload: record
        });
        //弹出预览报告的浮动层
        dispatch({
          type: 'AnalysisReportMaker/showPreviewModal',
          payload: record
        });
      }

    };

    const addReportProps = {
      //点击添加报告按钮
      onAdd(){
        //更新数据更新模式为create
        dispatch({
          type: 'AnalysisReportMaker/changeCommitType',
          payload: {
            commitType: 'create'
          }
        });
        //弹出浮动层
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
      commitType,

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
        let ctype = (commitType==="create" ? "commitStepData" : "updateStepData");
        dispatch({
          type: 'AnalysisReportMaker/loadStepData',
          payload: { selectTime: data }
        });
        dispatch({
          type: `AnalysisReportMaker/${ctype}`
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

    const reportPreviewProps = {
      preVisible,
      record,
      drawData,
      onPreCancel(){
        dispatch({
          type: 'AnalysisReportMaker/hidePreviewModal'
        });
      }
    }

    return(
      <MainLayout location={this.props.location}>
        <ReportAdd {...addReportProps} />
        <AnalysisReportList {...analysisReportListProps} />
        <ReportGenModal {...reportGenModalProps} />
        <ReportView {...reportPreviewProps} />
      </MainLayout>
    );
  }

}


function mapStateToProps( { AnalysisReportMaker } ){
  return { AnalysisReportMaker };
}

export default connect(mapStateToProps)(AnalysisScenseReport);

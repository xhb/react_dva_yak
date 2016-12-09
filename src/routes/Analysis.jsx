import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MainLayout from '../components/mainlayout/MainLayout';
import AnalysisResultList from '../components/analysis/AnalysisResultList';
import AnalysisResultPreviewModel from '../components/analysis/AnalysisResultPreviewModel';
import AnalysisResultSearch from '../components/analysis/AnalysisResultSearch';


class Analysis extends Component {

  constructor(props){
     super(props);
  }

  render(){

    const {
      list,
      total,
      loading,
      current,
      currentItem,
      previewModalVisible,
      previewModalLoading,
      field,
      keyword,
      previewModalChartList,
      previewModalTital,
    } = this.props.analysisCsvChart ;

    const dispatch = this.props.dispatch;

    const AnalysisResultListProps = {

      total: total,
      current: current,
      dataSource: list,
      loading: loading,

      //控制分页数据
      onPageChange(page) {
        dispatch(routerRedux.push({
          pathname: '/analysis',
          query: { field, keyword, page },
        }));
      },

      //控制每个场景的报告制作
      handleReportMaker(caseName){
        dispatch(routerRedux.push({
          pathname: '/analysis/casereport',
          query: { case: caseName },
        }));
      },

      //控制数据图表的预览
      handlePreview(record){
        dispatch({
          type: 'analysisCsvChart/queryChartsOnPreviewModal',
          payload: record
        });
      },
    }

    const userSearchProps = {
      field,
      keyword,
      onSearch(fieldsValue) {
        dispatch(routerRedux.push({
          pathname: '/analysis',
          query: { ...fieldsValue, page: 1 },
        }));
      }
    }

    const previewModalProps = {

      previewModalTital,
      previewModalVisible,
      previewModalLoading,
      previewModalChartList,

      handlePreviewOk(){
        dispatch({
          type: 'analysisCsvChart/hideModal'
        });
      },

      handlePreviewCancel(){
        dispatch({
          type: 'analysisCsvChart/hideModal'
        });
      }
    };

    //每次都重新创建一个preview modal组件, 不然modal层做diff会导致浮动层卡顿
    //
    const ResultPreviewModelGen = () =>
        <AnalysisResultPreviewModel {...previewModalProps} />;

    return(
      <MainLayout location={this.props.location}>
        <AnalysisResultSearch { ...userSearchProps } />
        <AnalysisResultList { ...AnalysisResultListProps } />
        <ResultPreviewModelGen />
      </MainLayout>
    );
  }

}

//属性定义
Analysis.PropTypes = {
  //当前的url路径信息
  location: PropTypes.any,
  //redux提供的dispatch
  dispatch: PropTypes.func,
  //整个数据分析模型的状态数据
  analysisCsvChart: PropTypes.array
}

function mapStateToProps( { analysisCsvChart } ){
  return { analysisCsvChart };
}

export default connect(mapStateToProps)(Analysis);

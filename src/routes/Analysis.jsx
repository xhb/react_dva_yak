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

      onPageChange(page) {
        dispatch(routerRedux.push({
          pathname: '/analysis',
          query: { field, keyword, page },
        }));
      },

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

function mapStateToProps( { analysisCsvChart } ){
  return { analysisCsvChart };
}

export default connect(mapStateToProps)(Analysis);

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MainLayout from '../components/mainlayout/MainLayout';
import AnalysisResultList from '../components/analysis/AnalysisResultList';
import AnalysisResultPreviewModel from '../components/analysis/AnalysisResultPreviewModel';
import AnalysisResultSearch from '../components/analysis/AnalysisResultSearch';


class  CSVChart extends Component {

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
      previwModalVisible,
      previwModalLoading,
      field,
      keyword,
    } = this.props.analysisCsvChart ;

    const dispatch = this.props.dispatch;

    const AnalysisResultListProps = {

      total: total,
      current: current,
      dataSource: list,
      loading: loading,

      onPageChange(page) {
        dispatch(routerRedux.push({
          pathname: '/analysis/csvchart',
          query: { field, keyword, page },
        }));
      },

      handlePreview(record){
        dispatch({
          type: 'analysisCsvChart/showModal'
        });
      },
    }

    const userSearchProps = {
      field,
      keyword,
      onSearch(fieldsValue) {
        dispatch(routerRedux.push({
          pathname: '/analysis/csvchart',
          query: { ...fieldsValue, page: 1 },
        }));
      }
    }

    const previewModalProps = {
      previwModalVisible,

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


    return(
      <MainLayout location={this.props.location}>
        <AnalysisResultSearch { ...userSearchProps } />
        <AnalysisResultList { ...AnalysisResultListProps } />
        <AnalysisResultPreviewModel {...previewModalProps} />
      </MainLayout>
    );
  }

}

function mapStateToProps( { analysisCsvChart } ){
  return { analysisCsvChart };
}

export default connect(mapStateToProps)(CSVChart);

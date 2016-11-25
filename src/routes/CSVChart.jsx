import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import MainLayout from '../components/mainlayout/MainLayout';
import AnalysisResultList from '../components/analysis/AnalysisResultList';
import AnalysisResultPreviewModel from '../components/analysis/AnalysisResultPreviewModel';
import AnalysisResultSearch from '../components/analysis/AnalysisResultSearch';


class  CSVChart extends Component {

  constructor(props){
     super(props);
  }

  componentDidMount() {
    this.props.dispatch({
        type: 'analysisCsvChart/query',
    });
  }

  render(){

    const userSearchProps={};
    const userModalProps={};
    const { list, total, loading, current, currentItem, previwModalVisible, previwModalLoading } =  this.props.analysisCsvChart ;

    const AnalysisResultListProps = {
      total: total,
      current: current,
      dataSource: list,
      loading: loading
    }

    return(
      <MainLayout>
        <AnalysisResultSearch />
        <AnalysisResultList { ...AnalysisResultListProps } />
        <AnalysisResultPreviewModel />
      </MainLayout>
    );
  }

}

function mapStateToProps( { analysisCsvChart } ){
  return { analysisCsvChart };
}

export default connect(mapStateToProps)(CSVChart);

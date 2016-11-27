import React, {Component, PropTypes} from 'react';
import YAreaChart from '../charts/YAreaChart';
import { Modal, Spin, Collapse } from 'antd';
import _ from "underscore";

const Panel = Collapse.Panel;

class AnalysisResultPreviewModel extends Component {

  constructor(props){
    super(props);
  }

  render(){
    //previewModalChartList =
    //[
    //  {
    //    node: 1, data: [
    //                     { filename: "x", data: [{ time: '', tpm: '' }, { time: '', tpm: '' }] },
    //                     { filename: "x", data: [{ time: '', cpu: '' }, { time: '', cpu: '' }] },
    //                  ]
    //  },
    //  {
    //    node: 2, data: [] }
    //]
    //
    let nodeCollapse = [];
    this.props.previewModalChartList.forEach(function(nodeData, nodeIndex){
      let fileCollapse = [];
      nodeData.data.forEach(function(fileData, fileIndex){
        let yChartList = [];

        let columns =  _.keys(fileData.data[0]).length
        for(let i = 1; i<columns; i++){
          let dataSeries = [];
          let time = _.keys(fileData.data[0])[0];
          let tpm  = _.keys(fileData.data[0])[i];
          fileData.data.forEach(function(record){
              dataSeries.push(_.pick(record, time, tpm));
          });
          yChartList.push(
            <div key={i}>
              <YAreaChart key={i} data={dataSeries}/>
            </div>
          );
        }

        fileCollapse.push(
          <Collapse key={fileIndex} >
            <Panel header={fileData.filename} key={fileIndex}>
              {yChartList}
            </Panel>
          </Collapse>
        );
      });

      nodeCollapse.push(
        <Panel header={"节点：" + nodeData.node} key={nodeIndex} >
          {fileCollapse}
        </Panel>
      );
    });

    return(
      <div>
        <Modal
          title={this.props.previewModalTital}
          visible={this.props.previewModalVisible}
          onOk={this.props.handlePreviewOk}
          onCancel={this.props.handlePreviewCancel}
          width={1100}
        >
        <Spin tip="加载中......" size="large" spinning={this.props.previewModalLoading} >
          <Collapse>{nodeCollapse}</Collapse>
        </Spin>

        </Modal>
      </div>
    );
  }

}

export default AnalysisResultPreviewModel;


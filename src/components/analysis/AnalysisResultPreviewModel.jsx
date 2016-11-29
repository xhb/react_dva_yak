import React, {Component, PropTypes} from 'react';
import YAreaChart from '../charts/YAreaChart';
import {Alert, Modal, Spin, Collapse, message } from 'antd';
import _ from "underscore";

const Panel = Collapse.Panel;

class AnalysisResultPreviewModel extends Component {

  constructor(props){
    super(props);
  }

  onRenderingTiptop(){
    message.loading("请等待图像渲染完成...", 0);
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
            <div className="yAreaChart" key={i}>
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

    const TipTopLoading = ()=>{
      if(this.props.previewModalLoading){
        message.destroy();
        message.success("获取原始数据中...");
      }
      return(null);
    }

    return(
        <Modal
          title={this.props.previewModalTital}
          visible={this.props.previewModalVisible}
          onOk={this.props.handlePreviewOk}
          onCancel={this.props.handlePreviewCancel}
          width={1100}
        >
          <TipTopLoading />
          <Collapse onChange={ ()=>{
                message.destroy();
                message.warning("打开结果文件时，图像渲染比较慢，可能要30s，请耐心等待。", 5)
              }
            }
          >
            {nodeCollapse}
          </Collapse>
        </Modal>
    );
  }

}

export default AnalysisResultPreviewModel;


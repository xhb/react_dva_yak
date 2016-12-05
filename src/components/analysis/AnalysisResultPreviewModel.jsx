import React, {Component, PropTypes} from 'react';
import YAreaChart from '../charts/YAreaChart';
import YTable from '../charts/YTable';
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
        let columns_keys = _.keys(fileData.data[0]);
        let columns_counts =  columns_keys.length

        if( columns_keys[0] && columns_keys[0].trim().toLowerCase() == "time" ){
        //如果csv数据的第一列开头是以time开头，就表示要画成时序图
          for(let i = 1; i<columns_counts; i++){
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
        }else{
        //如果不是，就表现成为table的形式
          yChartList.push(
            <div className="yTable" key={fileIndex}>
              <YTable key={fileIndex} columns={columns_keys} data={fileData.data}/>
            </div>
          );
        };

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
        <Modal
          title={this.props.previewModalTital}
          visible={this.props.previewModalVisible}
          onOk={this.props.handlePreviewOk}
          onCancel={this.props.handlePreviewCancel}
          width={1100}
        >
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


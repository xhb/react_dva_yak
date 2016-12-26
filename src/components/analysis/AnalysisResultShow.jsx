import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import YAreaChart from '../charts/YAreaChart';
import YTable from '../charts/YTable';
import {Alert, Modal, Spin, Collapse, message, Checkbox} from 'antd';
import _ from "underscore";

const Panel = Collapse.Panel;

class AnalysisResultShow extends Component {

  constructor(props){
    super(props);
    //这个state保留全部用户定制过的显示数据
    this.state = {
      //时序图对应的选择数据
      //数据结构:
      //  格式: "节点号 -> 文件名 -> 列名";
      areachart: [],
      //表格数据对应选择
      //数据结构:
      //  格式: "node{节点号}file{文件索引号}": object,
      //       "node{节点号}file{文件索引号}": object,
      ytable: {},
    };
  }

  //提取时序图标记
  areaCheckBoxOnChange(e){
    let chooseAreaCharts = this.state.areachart;
    let checkedAreaCharts = e.target.value;
    if(e.target.checked){
      //如果state的areachart里面没有该项目,添加进去
      if(! _.find(chooseAreaCharts, (e)=>{ return(e==checkedAreaCharts) } ) ){
        chooseAreaCharts.push(checkedAreaCharts);
      }
    }else{
      chooseAreaCharts = _.without(chooseAreaCharts, checkedAreaCharts);
    }
    this.state.areachart = chooseAreaCharts;
    console.log(this.state);
  }

  //提取表格数据标记
  tableCheckBoxOnChange(e){
    let tableChartLabel = e.target.value;
    let ytableChoose = this.refs[tableChartLabel].state.yTableNS;
    if(e.target.checked){
      this.state.ytable[tableChartLabel] = ytableChoose;
    }else{
      this.state.ytable[tableChartLabel] = null;
    }
    console.log(this.state);
  }


  render(){

    let nodeCollapse = [];
    console.log(this.props.chartDataList);
    this.props.chartDataList.forEach(function(nodeData, nodeIndex){
      //节点数据一级
      let fileCollapse = [];
      nodeData.data.forEach(function(fileData, fileIndex){
        //结果文件数据一级
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
            //checkbox—value格式: 节点号 -> 文件名 -> 列名
            let yAreaChartRef = nodeData.node + "->" + fileData.filename + "->" + tpm;
            yChartList.push(
              <div className="yAreaChart" key={i}>
                <Checkbox
                  style={{margin: 16}}
                  value={yAreaChartRef}
                  onChange={this.areaCheckBoxOnChange.bind(this)}>{tpm}
                </Checkbox>
                <YAreaChart key={i} data={dataSeries}/>
              </div>
            );
          }
        }else{
          let ytableRef = "node" + nodeData.node + "file" + fileIndex;
        //如果不是，就表现成为table的形式
          yChartList.push(
            <div className="yTable" key={fileIndex}>
              <Checkbox
                style={{margin: 16}}
                value={ytableRef}
                onChange={this.tableCheckBoxOnChange.bind(this)}>
                {"提取图标数据模型"}
              </Checkbox>
              <YTable
                key={fileIndex}
                columns={columns_keys}
                data={fileData.data}
                ref={ytableRef}
              />
            </div>
          );
        };
        //一个结果文件，一个数据展示的折叠框
        fileCollapse.push(
          <Collapse key={fileIndex} >
            <Panel header={fileData.filename} key={fileIndex}>
              {yChartList}
            </Panel>
          </Collapse>
        );
      }.bind(this));
      //一个节点有多个结果文件
      nodeCollapse.push(
        <Panel header={"节点：" + nodeData.node} key={nodeIndex} >
          {fileCollapse}
        </Panel>
      );
    }.bind(this));

    return(

      <Collapse onChange={
          ( )=>{
            message.destroy();
            message.warning("打开结果文件时，图像渲染比较慢，可能要30s，请耐心等待。", 5)
          }
        }
      >
        {nodeCollapse}
      </Collapse>

    );
  }

}

//属性定义
AnalysisResultShow.PropTypes = {
  //预览浮动层保存的图标数据
  chartDataList: PropTypes.array,
}

// chartDataList 数据格式:
// [
//  {
//    node: "1",   //节点号
//    data: [
//      {
//        filename: "yak_result.csv",  //数据结果文件名
//        data: [
//          {AverageTPM : "0", CurrentTPM: "0", Time: "13:04:50"}, //csv的1行数据
//          {AverageTPM : "0", CurrentTPM: "0", Time: "13:04:51"},
//        ]
//      },
//      {
//        filename: "yak_result2.csv",
//        data: [
//          {AverageTPM : "0", CurrentTPM: "0", Time: "13:04:50"},
//          {AverageTPM : "0", CurrentTPM: "0", Time: "13:04:51"},
//        ]
//      }
//    ]
//  },
//  {
//    node: "2"
//    data: []
//  }
// ]

export default AnalysisResultShow;


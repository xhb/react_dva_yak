import React, {Component, PropTypes} from 'react';
import {Alert, Modal, Spin, Collapse, message } from 'antd';
import StackAreaChart from "../../../stackcharts/stackAreaChart";
import StackYTable from "../../../stackcharts/stackYTable";
import _ from "underscore";

class StackChartViewer extends Component {

  constructor(props){
    super(props);
  }

  render(){

    let chartDef  = this.props.chartDefined;
    let drawData  = this.props.drawData;
    let chartType = _.first(_.keys(chartDef));
    let genStackChart = [];
    let timestamps = [];

    //画图类型
    if(chartType == "areachart"){
    //画成区域时序图
      let charts = chartDef["areachart"];
      charts.forEach((chartStr, index) => {
        //每个chartstr定义一副画图
        let AreaChartData = [];

        drawData.forEach((itemData) => {

          let chartDefArray = chartStr.split("->");
          let [selectedNode, selectedFile, selectedColumn] = chartDefArray;

          //选择对应节点数据
          let selectNodeData = itemData.data.filter(function(e) {
            return e.node == selectedNode;
          });

          //选择节点中对应文件的数据
          let selectFileData = _.first(selectNodeData).data.filter(function(e) {
            return e.filename == selectedFile;
          });

          //选择对应的数据列
          let selectData = _.first(selectFileData).data;
          let time = _.keys(_.first(selectData))[0];
          let selectDataCols = selectData.map((e)=>{
            return(_.pick(e, time, selectedColumn));
          });

          //对应的数据列打上日期标记
          let dataStamp = itemData.date;
          let modifyData = selectDataCols.map((e)=>{
            let obj={};
            obj[time] = e[time];
            obj[selectedColumn + "_" + dataStamp] = e[selectedColumn];
            return obj;
          });

          //收集画图数据
          if(_.isEmpty(AreaChartData)){
            AreaChartData = modifyData;
          }else{
            AreaChartData = AreaChartData.map((e, i)=>{
              return _.extend(e, modifyData[i])
            });
          }
        });
        // 合并同一副图的两个日期的数据,做一幅图
        genStackChart.push(<StackAreaChart data={AreaChartData} key={index} />);
      });
    }else if(chartType == "ytable"){
    //画成表格或是叠加柱状图
      let tablesDef = chartDef["ytable"];
      let tables = _.keys(tablesDef);
      tables.forEach((item, index)=>{
        //每个chartstr定义一副画图
        let AreaChartData = [];

        drawData.forEach((itemData) => {
          let tableDefStr = item.split("file");
          let nodeIndex =  _.last(_.first(tableDefStr).split("node"));
          let fileIndex = _.last(tableDefStr);

          //选择对应节点数据
          let selectNodeData = itemData.data.filter(function(e) {
            return e.node == nodeIndex;
          });

          //选择文件数据
          let selectFileData = _.first(selectNodeData).data[fileIndex].data;

          //table类型的数据整合
          if(tablesDef[item].showTable == "true"){
            //收集画图数据, 每项数据变成 K:'Va <=> Vb',这样的格式
            if(_.isEmpty(AreaChartData)){
              AreaChartData = selectFileData;
            }else{
              AreaChartData = AreaChartData.map( (e, i) => {
                let newe = _.mapObject(e, (v, k)=>{
                  return (v + " <=> " + selectFileData[i][k]);
                });
                return newe;
              });
            }
          }else if(tablesDef[item].showBar == "true"){
            //收集数据叠加成bar图
            let selectedColumn = tablesDef[item].selectCols;

            //选择对应的数据列
            let xaxis = _.first(selectedColumn);
            let selectDataCols = selectFileData.map((e)=>{
              return(_.pick(e, ...selectedColumn));
            });

            selectedColumn = _.without(selectedColumn, xaxis);
            //对应的数据列打上日期标记
            let dataStamp = itemData.date;
            timestamps.push(dataStamp);

            let modifyData = selectDataCols.map((e)=>{
              let obj={};
              obj[xaxis] = e[xaxis];
              //替换除了第一列以外的键值对
              selectedColumn.forEach((col)=>{
                obj[ col + "_" + dataStamp] = e[col];
              });
              return obj;
            });

            //收集画图数据
            if(_.isEmpty(AreaChartData)){
              AreaChartData = modifyData;
            }else{
              AreaChartData = AreaChartData.map((e, i)=>{
                return _.extend(e, modifyData[i])
              });
            }
          }

        });
        console.log(AreaChartData);
        //画出每副图表
        genStackChart.push(
          <StackYTable
            key  = {index}
            data = {AreaChartData}
            {...tablesDef[item]}
            timestamp = {timestamps}
          />
        );

      });

    }

    return(
      <div>
        {genStackChart}
      </div>
    );
  }

}

StackChartViewer.PropTypes = {
  chartDefined: PropTypes.any,
  drawData: PropTypes.any
}

export default StackChartViewer;

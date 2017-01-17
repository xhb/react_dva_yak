import React, { Component, PropTypes } from 'react';
import _ from "underscore";
import MarkdownViewer from "./markdown";
import StackChartViewer from "./stackchartviewer";
import styles from "./reportShow.less";

class ReportShow extends Component{

  constructor(props){
    super(props);
  }

  render( ) {

    const data = this.props.metadata;
    const chartDefined = data.chart;
    const drawData = this.props.drawdata;

    return (
      <div className="report">
      <h3 className={styles.h3Content}>报告名称: {data.reportName}</h3>
      <h3 className={styles.h3Content}>测试版本: {data.testVersion}</h3>
      <h3 className={styles.h3Content}>场景描述: </h3>
        <div className={styles.markdowViewer}>
          <MarkdownViewer source={data.scenseDes} />
        </div>
      <h3 className={styles.h3Content}>叠加结果: </h3>
        <div className={styles.stackChartViewer}>
          <StackChartViewer
            chartDefined = {chartDefined}
            drawData = {drawData}
          />
        </div>
      </div>
    )
  }

}

ReportShow.PropTypes = {
  //整份报告的数据定义
  metadata: PropTypes.any,
  //画图需要的实际数据，可能是多个日期的数据
  drawdata: PropTypes.array
}

export default ReportShow;

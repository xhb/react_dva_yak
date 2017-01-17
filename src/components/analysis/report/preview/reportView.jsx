import React, {Component, PropTypes} from 'react';
import {Alert, Modal, Spin, Collapse, message } from 'antd';
import _ from "underscore";
import ReportShow from "./reportShow.jsx";

//制作场景报告的浮动层
class ReportView extends Component {

  constructor(props){
    super(props);
  }

  render(){
    const { record, drawData } = this.props;
    return (
      <Modal
        title="测试报告"
        visible={this.props.preVisible}
        onCancel={this.props.onPreCancel}
        onOk={this.props.onPreCancel}
        width={1100}
      >
        <ReportShow metadata={record} drawdata={drawData} />
      </Modal>
    );
  }

}

//属性定义
ReportView.PropTypes = {
  //制作图标步骤页面是否可见
  preVisible: PropTypes.bool,
  //隐藏浮动层
  onPreCancel: PropTypes.func,
  //一份报告的数据结构描述
  record: PropTypes.any,
  //画图所需的全部数据
  drawdata: PropTypes.array
}

export default ReportView;


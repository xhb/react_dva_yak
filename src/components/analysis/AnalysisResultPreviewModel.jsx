import React, {Component, PropTypes} from 'react';
import {Alert, Modal, Spin, Collapse, message } from 'antd';
import AnalysisResultShow from './AnalysisResultShow';
const Panel = Collapse.Panel;

class AnalysisResultPreviewModel extends Component {

  constructor(props){
    super(props);
  }

  render(){

    return(
      <Modal
        title={this.props.previewModalTital}
        visible={this.props.previewModalVisible}
        onOk={this.props.handlePreviewOk}
        onCancel={this.props.handlePreviewCancel}
        width={1100}
      >
        <AnalysisResultShow chartDataList={this.props.previewModalChartList}/>
      </Modal>
    );

  }

}

//属性定义
AnalysisResultPreviewModel.PropTypes = {
  //预览浮动层保存的图标数据
  previewModalChartList: PropTypes.array,
  //预览浮动层的标题
  previewModalTital: PropTypes.any,
  //浮动层显示的控制开关
  previewModalVisible: PropTypes.bool,
  //浮动层点击确定按钮回调
  handlePreviewOk: PropTypes.func,
  //浮动层点击取消按钮回调
  handlePreviewCancel: PropTypes.func
}

export default AnalysisResultPreviewModel;


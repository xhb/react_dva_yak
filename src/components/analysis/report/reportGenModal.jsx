import React, {Component, PropTypes} from 'react';
import {Alert, Modal, Spin, Collapse, message } from 'antd';
import _ from "underscore";
import ReportStep from "./reportStep";

//制作场景报告的浮动层
class ReportGenModal extends Component {

  constructor(props){
    super(props);
  }

  render(){

    const {
      onStepOne,
      onStepTwo,
      onStepThere
    } = this.props

    const reportStepProps = {
      onStepOne,
      onStepTwo,
      onStepThere
    }

    return(
        <Modal
          title="制作场景报告"
          visible={this.props.modalVisible}
          onCancel={this.props.onCancel}
          width={1100}
          footer={false}
        >
          <ReportStep {...reportStepProps} />
        </Modal>
    );
  }

}

//属性定义
ReportGenModal.PropTypes = {
  //制作图标步骤页面是否可见
  modalVisible: PropTypes.bool,
  //隐藏浮动层
  onCancel: PropTypes.func,
  //步骤1成功的回调
  onStepOne: PropTypes.func,
  //步骤2成功的回调
  onStepTwo: PropTypes.func,
  //步骤3成功的回调
  onStepThere: PropTypes.func,
  //一份报告的数据结构描述
  item: PropTypes.any
}

export default ReportGenModal;


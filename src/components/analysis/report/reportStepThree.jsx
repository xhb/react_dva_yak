import React, {Component, PropTypes } from 'react';
import { Form, Input, Modal } from 'antd';

//步骤三，添加绘图数据的所需要的时间信息

class ReportStepThree extends Component {

  constructor(props){
    super(props);
  }

  //steps调用下一步时，调用这个子组件方法验证数据和添加数据
  handleSubmit(){
    if (errors) {
      this.props.stepCheck("error");
      return;
    }
    this.props.stepCheck("process");
    const data = "";
    this.props.onStepOne(data);
  }

  render(){

    const {
      item = {},
      onStepTwo,
      stepCheck
    } = this.props;

    return(
      <div onClick={this.handleSubmit.bind(this)}>

      </div>
    );
  }

}

//属性定义
ReportStepThree.propTypes = {
  //编辑一个报告时传进来的表格对象初始化数据
  item: PropTypes.object,
  //编辑完成之后，提交数据
  onStepTwo: PropTypes.func,
  //步骤提交错误验证
  stepCheck: PropTypes.func
};

export default ReportStepThree;

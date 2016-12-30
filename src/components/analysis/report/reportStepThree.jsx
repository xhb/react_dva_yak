import React, {Component, PropTypes } from 'react';
import { Form, Input, Modal, Transfer } from 'antd';

//步骤三，添加绘图数据的所需要的时间信息

class ReportStepThree extends Component {

  constructor(props){
    super(props);
    this.state = {
      targetKeys: [],
      selectedKeys: [],
    }
  }

  //steps调用下一步时，调用这个子组件方法验证数据和添加数据
  handleSubmit(){
    if(this.state.targetKeys.length === 0){
      this.props.stepCheck("error");
      return false;
    }else{
      this.props.stepCheck("process");
      let selectedDate = [];
      this.state.targetKeys.forEach((e)=>{
        selectedDate.push(this.props.resultDateList[e]);
      });
      this.props.onStepThere(selectedDate);
      return true;
    }
  }

  //传输框日期变动
  handleChange(nextTargetKeys, direction, moveKeys){
    this.setState({
      //...this.state,
      targetKeys: nextTargetKeys
    });
  }

  //选择的日期变动
  handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    this.setState({
      //...this.state,
      selectedKeys: [
        ...sourceSelectedKeys,
        ...targetSelectedKeys
      ]
    });
  }

  render(){

    const {
      item = {},
      resultDateList,
      onStepThere,
      stepCheck
    } = this.props;

    let dateData = resultDateList.map((e, i)=>{
      return({key: i, title: e});
    });

    return(
      <div>
        <div className="transferDiv" onClick={this.handleSubmit.bind(this)} />
        <Transfer
          dataSource={dateData}
          titles={['源头', '选中']}
          targetKeys={this.state.targetKeys}
          selectedKeys={this.state.selectedKeys}
          onChange={this.handleChange.bind(this)}
          onSelectChange={this.handleSelectChange.bind(this)}
          render={item => item.title}
        />
      </div>
    );
  }

}

//属性定义
ReportStepThree.propTypes = {
  //编辑一个报告时传进来的表格对象初始化数据
  item: PropTypes.object,
  //编辑完成之后，提交数据
  onStepThere: PropTypes.func,
  //步骤提交错误验证
  stepCheck: PropTypes.func,
  //存在测试结果的日期列表
  resultDateList: PropTypes.array
};

export default ReportStepThree;

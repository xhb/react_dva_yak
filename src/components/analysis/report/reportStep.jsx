import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Steps, Button, message } from 'antd';
import styles from "./reportStep.less";
import ReportStepOne from "./reportStepOne";
import ReportStepTwo from "./reportStepTwo";
import ReportStepThree from "./reportStepThree";

const Step = Steps.Step;

class ReportStep extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      status: "process"
    };
  }

  setStepStatus(result){
    this.setState({...this.state, status: result});
  }

  next() {
    let step;
    if(this.state.current == 0){
      //步骤一, 添加场景步骤描述
      step = ReactDOM.findDOMNode(this.refs.reportStepOne);
    }else if(this.state.current == 1){
      //步骤二, 添加图形定义描述
      step = ReactDOM.findDOMNode(this.refs.reportStepTwo);
    }else if(this.state.current == 2){
      //步骤三, 添加数据时间集合
      step = ReactDOM.findDOMNode(this.refs.reportStepThree);
    }
    step.click();
    if( this.state.status == "error"){
      return;
    };
    const current = this.state.current + 1;
    this.setState({ ...this.state, current: current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ ...this.state, current: current });
  }

  render() {

    const steps = [{
      title: '添加场景描述',
      content: '',
    }, {
      title: '选择图标数据',
      content: 'Second-content',
    }, {
      title: '选择对比日期',
      content: 'Last-content',
    }];

    const { current, status } = this.state;

    return (
      <div>

        <Steps current={current} status={status} >
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>

        <div className={styles.stepsContent} >
          {
            this.state.current == 0
            &&
            <ReportStepOne
              ref="reportStepOne"
              onStepOne={this.props.onStepOne}
              item={this.props.item}
              stepCheck={this.setStepStatus.bind(this)}
            />
          }

          {
            this.state.current == 1
            &&
            <ReportStepTwo
              ref="reportStepTwo"
              onStepTwo={this.props.onStepOne}
              item={this.props.item}
              stepCheck={this.setStepStatus.bind(this)}
            />
          }

          {
            this.state.current == 2
            &&
            <ReportStepThree
              ref="reportStepThree"
              onStepThere={this.props.onStepOne}
              item={this.props.item}
              stepCheck={this.setStepStatus.bind(this)}
            />
          }
        </div>

        <div className={styles.stepsAction} >
          {
            this.state.current > 0
            &&
            <Button  type="ghost" onClick={() => this.prev()}>
              上一步
            </Button>
          }

          {
            this.state.current < steps.length - 1
            &&
            <Button
              style={{ marginLeft: 8 }}
              type="primary"
              onClick={ ()=>this.next() }>
              下一步
            </Button>
          }

          {
            this.state.current === steps.length - 1
            &&
            <Button
              style={{ marginLeft: 8 }}
              type="primary"
              onClick={() => {
                this.next();
                message.success('处理完成!')
              }}>
              完成
            </Button>
          }
        </div>

      </div>
    );
  }
}

//属性定义
ReportStep.PropTypes = {
  item: PropTypes.any,
  //步骤1成功的回调
  onStepOne: PropTypes.func,
  //步骤2成功的回调
  onStepTwo: PropTypes.func,
  //步骤3成功的回调
  onStepThere: PropTypes.func
};

export default ReportStep;

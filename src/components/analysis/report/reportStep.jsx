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
      status: "error"
    };
  }

  setStepStatus(result){
    this.setState({...this.state, status: result});
  }

  resetStep(){
    this.setState({...this.state, current: 0});
  }

  stepOneFormChange(changedFields){
    //步骤1中的表单数据发生变化，这里就会被回调
    let nameErr=false, verErr=false, scenseErr=false;
    if(changedFields.reportName !== undefined){
      this.props.item.reportName = changedFields.reportName.value;
      nameErr = changedFields.reportName.errors === undefined ? false : true;
    }
    if(changedFields.testVersion !== undefined){
      this.props.item.testVersion = changedFields.testVersion.value;
      verErr = changedFields.testVersion.errors === undefined ? false : true;
    }
    if(changedFields.scenseDes !== undefined){
      this.props.item.scenseDes = changedFields.scenseDes.value;
      scenseErr = changedFields.scenseDes.errors === undefined ? false : true;
    }

    if(nameErr || verErr || scenseErr){
      this.setStepStatus("error");
    }else{
      this.setStepStatus("process");
    }
  }


  next() {
    let step;
    let stepResult = false;
    if(this.state.current == 0){
      //步骤一, 添加场景步骤描述
      this.props.onStepOne(this.props.item);
      stepResult = true;
    }else if(this.state.current == 1){
      //步骤二, 添加图形定义描述
      step = this.refs.reportStepTwo;
      stepResult = step.handleSubmit();
    }else if(this.state.current == 2){
      //步骤三, 添加数据时间集合
      step = this.refs.reportStepThree;
      stepResult = step.handleSubmit();
    }

    if( this.state.status == "error" || stepResult == false){
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
              item={this.props.item}
              onChange={this.stepOneFormChange.bind(this)}
            />
          }

          {
            this.state.current == 1
            &&
            <ReportStepTwo
              ref="reportStepTwo"
              onStepTwo={this.props.onStepTwo}
              item={this.props.item}
              stepCheck={this.setStepStatus.bind(this)}
              scensName={this.props.scensName}
              resultDateList={this.props.resultDateList}
              tmpData={this.props.tmpData}
              onQueryChart={this.props.onQueryChart}
            />
          }

          {
            this.state.current == 2
            &&
            <ReportStepThree
              ref="reportStepThree"
              onStepThere={this.props.onStepThere}
              item={this.props.item}
              stepCheck={this.setStepStatus.bind(this)}
              resultDateList={this.props.resultDateList}
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
                setTimeout(()=>{
                  if(this.state.current == 3){
                    //关闭浮动层
                    this.resetStep();
                    this.props.onCancel();
                    message.success('处理完成!');
                  }
                }, 200);
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
  onStepThere: PropTypes.func,
  //场景名称
  scensName: PropTypes.any,
  //该场景全部结果日期
  resultDateList: PropTypes.array,
  //选择的结果数据所在日期
  resultDate: PropTypes.any,
  //所在日期测试结果临时数据
  tmpData: PropTypes.array,
  //获取所在日期测试结果临时数据回调接口
  onQueryChart: PropTypes.func,
  //关闭浮动层
  onCancel: PropTypes.func,
};

export default ReportStep;

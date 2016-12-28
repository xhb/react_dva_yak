import React, {Component, PropTypes } from 'react';
import { Form, Input, Modal, Select, Button } from 'antd';
import AnalysisResultShow from "../AnalysisResultShow";
import style from "./reportStepTwo.less";
import _ from "underscore";

const Option = Select.Option;

//步骤二，添加绘图数据的描述信息

class ReportStepTwo extends Component {

  constructor(props){
    super(props);
    this.state = {
      chartDefData: {}
    }
  }

  //steps调用下一步时，调用这个子组件方法验证数据和添加数据
  handleSubmit(){
    if( _.isEmpty(this.state.chartDefData) ){
      console.log("step two no select chart data!");
      return false;
    }
    let data = this.state.chartDefData;
    this.props.onStepTwo(data);
    return true;
  }

  getChartDef(data){
    this.state.chartDefData = data;
  }

  onSelectChange(value){
    //更新图表数据tmpdata
    this.props.onQueryChart(value);
  }

  render(){

    const {
      item = {},
      onStepTwo,
      stepCheck,
      resultDateList,
      tmpData,
    } = this.props;

    let allResult = [];
    resultDateList.forEach((result, index)=>{
      allResult.push(
        <Option value={result} key={index}>{result}</Option>
      );
    });

    return (
      <div>
        <div onClick={this.handleSubmit.bind(this)} />
        <div className={style.selectDiv}>
          <span className={style.buttonSpan}>
            <Button type="primary" >获取图表数据</Button>
          </span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.onSelectChange.bind(this)}
          >
            {allResult}
          </Select>
        </div>

        {
          tmpData.length != 0
          &&
          <AnalysisResultShow
            chartDataList={tmpData}
            passCurrentState={this.getChartDef.bind(this)}
          />
        }
      </div>

    );
  }

}

//属性定义
ReportStepTwo.propTypes = {
  //编辑一个报告时传进来的表格对象初始化数据
  item: PropTypes.object,
  //编辑完成之后，提交数据
  onStepTwo: PropTypes.func,
  //步骤条提交错误验证
  stepCheck: PropTypes.func,
  //场景名称
  scensName: PropTypes.string,
  //全部结果日期列表
  resultDateList: PropTypes.array,
  //某个日期获取的图标临时数据
  tmpData: PropTypes.array,
  //获取图标数据的回调接口，参数是 日期
  onQueryChart: PropTypes.func,
};

export default ReportStepTwo;

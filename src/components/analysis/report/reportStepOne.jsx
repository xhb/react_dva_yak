import React, {Component, PropTypes } from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

//步骤一，添加测试场景的描述信息

class ReportStepOne extends Component {

  constructor(props){
    super(props);
  }

  //steps调用下一步时，调用这个子组件方法验证数据和添加数据
  handleSubmit(){
    this.props.form.validateFields((errors) => {
      if (errors) {
        this.props.stepCheck("error");
        return;
      }
      this.props.stepCheck("process");
      const data = { ...this.props.form.getFieldsValue() };
      this.props.onStepOne(data);
    });
  }

  render(){

    const {
      item = {},
      onStepOne,
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      },
    } =  this.props;

    return(
      <div onClick={this.handleSubmit.bind(this)}>
        <Form horizontal >
          <FormItem
            label="报告名称: "
            hasFeedback
            {...formItemLayout}
          >
            {
              getFieldDecorator('reportName', {
                initialValue: item.reportName,
                rules: [
                  { required: true, message: '报告名称没有填写!' },
                ],
              })( <Input type="text" />)
            }
          </FormItem>

          <FormItem
            label="测试版本: "
            hasFeedback
            {...formItemLayout}
          >
            {
              getFieldDecorator('testVersion', {
                initialValue: item.testVersion,
                rules: [
                  { required: true, message: '测试版本没有填写!' },
                ],
              })(<Input type="text" />)
            }
          </FormItem>

          <FormItem
            label="场景描述: "
            hasFeedback
            {...formItemLayout}
          >
            {
              getFieldDecorator('scenseDes', {
                initialValue: item.scenseDes,
                rules: [
                  { required: true, message: '场景描述没有填写!' },
                ],
              })(<Input type="textarea" autosize />)
            }
          </FormItem>
        </Form>
      </div>
    );
  }

}

//属性定义
ReportStepOne.propTypes = {
  //传进来的表格对象
  form: PropTypes.object,
  //编辑一个报告时传进来的表格对象初始化数据
  item: PropTypes.object,
  //编辑完成之后，提交数据
  onStepOne: PropTypes.func,
  //步骤条提交错误验证
  stepCheck: PropTypes.func
};

export default Form.create()(ReportStepOne);

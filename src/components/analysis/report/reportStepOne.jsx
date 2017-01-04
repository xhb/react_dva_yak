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
    this.state={
      validated: false
    }
  }

  render(){

    const {
      item = {},
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        setFieldsValue,
      },
    } =  this.props;

    return (
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
    );
  }
}

//属性定义
ReportStepOne.propTypes = {
  //传进来的表格对象
  form: PropTypes.object,
  //编辑一个报告时传进来的表格对象初始化数据
  item: PropTypes.object,
  //错误验证
  onChange: PropTypes.func
};

export default Form.create({
  //在表单域发生变化是回调onchange通知上层组件
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  //映射属性中的表单域值
  mapPropsToFields(props) {
    return {
      reportName: {
        value: props.item.reportName,
      },
      testVersion: {
        value: props.item.testVersion,
      },
      scenseDes: {
        value: props.item.scenseDes
      }
    };
  },
})(ReportStepOne);

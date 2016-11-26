import React, {Component, PropTypes } from 'react';
import { Form, Input, Button, Select } from 'antd';
import styles from './AnalysisResultSearch.less';

class AnalysisResultSearch extends Component {

  constructor(props){
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      }
      this.props.onSearch(this.props.form.getFieldsValue());
    });
  }

  render(){

    const {
      field,
      keyword,
      onSearch,
      onAdd,
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      },
    } = this.props

    return(
      <div className={styles.normal}>
        <div className={styles.search}>
          <Form inline onSubmit={this.handleSubmit.bind(this)}>
            <Form.Item>
              {
                getFieldDecorator('field', {initialValue: field || 'name'})(
                  <Select>
                    <Select.Option value="name">案例名称</Select.Option>
                    <Select.Option value="lastresult">最新结果</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item hasFeedback >
              {
                getFieldDecorator('keyword', {initialValue: keyword || ''})(
                  <Input type="text" />
                )
              }
            </Form.Item>
            <Button style={{ marginRight: '10px' }} type="primary" htmlType="submit">搜索</Button>
          </Form>
        </div>
      </div>
    );
  }

}

AnalysisResultSearch.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
};

export default Form.create()(AnalysisResultSearch);

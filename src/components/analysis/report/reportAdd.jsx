import React, {Component, PropTypes } from 'react';
import { Form, Input, Button, Select } from 'antd';
import styles from './ReportAdd.less';

class ReportAdd extends Component {

  constructor(props){
    super(props);
  }

  render(){

    return(

      <Button
        className={styles.createButton}
        type="primary"
        onClick={this.props.onAdd}>
        添加报告
      </Button>

    );
  }

}

//属性定义
ReportAdd.propTypes = {
  //添加按钮被点击时的回调
  OnAdd: PropTypes.func,
};

export default ReportAdd;

import React, {Component, PropTypes} from 'react';
import YAreaChart from '../charts/YAreaChart';
import { Modal } from 'antd';


class AnalysisResultPreviewModel extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <Modal
          title="Basic Modal"
          visible={this.props.previwModalVisible}
          onOk={this.props.handlePreviewOk}
          onCancel={this.props.handlePreviewCancel}
          width={1100}
        >
          <div>
            <YAreaChart/>
          </div>
          <div>
            <YAreaChart/>
          </div>
          <div>
            <YAreaChart/>
          </div>

        </Modal>
      </div>
    );
  }

}

export default AnalysisResultPreviewModel;


import React, { Component, PropTypes } from 'react';
import MainLayout from '../components/mainlayout/MainLayout';

class  DashBoard extends Component {

  constructor(props){
     super(props);
  }

  render(){
    return(
      <MainLayout location={this.props.location}>
        <p>还需要建设...</p>
      </MainLayout>
    );
  }

}

DashBoard.PropTypes = {
  //当前的url信息
  location: PropTypes.any
}

export default DashBoard;

import React, { Component, PropTypes } from 'react';
import MainLayout from '../components/mainlayout/MainLayout';

class  DashBoard extends Component {

  constructor(props){
     super(props);
  }

  render(){
    return(
      <MainLayout location={this.props.location}>
      </MainLayout>
    );
  }

}

export default DashBoard;

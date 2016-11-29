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

export default DashBoard;

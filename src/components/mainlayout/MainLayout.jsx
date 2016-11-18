import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Row, Col } from 'antd';
import SideBar from './sidebar';
import Header from './header';
import Footer from './footer'

class MainLayout extends Component {

  constructor(props){
    super(props);
  }

  render(){

    return(
      <div className="layout">
        <Row>
          <Header/>
        </Row>

        <Row type="flex">

          <Col span={4} >
              <SideBar/>
          </Col>

          <Col span={18} >
            {this.props.children}
          </Col>

        </Row>

        <Row>
          <Footer/>
        </Row>

      </div>
    );

  };

}

export default MainLayout;

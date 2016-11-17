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

        <Row gutter={24} >

          <Col span={5} >
              <SideBar/>
          </Col>

          <Col className='gutter-row' span={18} >
            {this.props.children}
            <Row>
              <Footer/>
            </Row>
          </Col>

        </Row>
      </div>
    );

  };

}

export default MainLayout;

import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Row, Col } from 'antd';
import { Link } from 'dva/router';

class Header extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <Menu
        mode="horizontal"
        theme="dark"
      >
      <Menu.Item key="home">
        <Link to="/"><Icon type="home" />Home</Link>
      </Menu.Item>

    </Menu>
    );
  }

}

export default Header;
import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Row, Col } from 'antd';
import { Link } from 'dva/router';
import style from './header.css';

class Header extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <Menu className={style.header}
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
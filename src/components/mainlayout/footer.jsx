import React, { Component, PropTypes } from 'react';
import styles from './footer.css';
import { Row, Col } from 'antd';


class Footer extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <Row>
      <footer className={styles.footer} >
        "welcom to yak platform!"
      </footer>
      </Row>
    );
  }

}

export default Footer;
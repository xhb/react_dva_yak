import React, { Component, PropTypes } from 'react';
import styles from './footer.css';
import { Row, Col } from 'antd';


class Footer extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (

        <div className={styles.footer} >
          "welcom to yak platform!"
        </div>

    );
  }

}

export default Footer;
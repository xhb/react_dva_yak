import React, { Component, PropTypes } from 'react';
import { Menu, Breadcrumb, Icon } from 'antd';
import styles from "./mainlayout.css";

class MainLayout extends Component {

  constructor(props){
    super(props);
    this.state = {
      collapse: true,
    };
  }

  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    })
  }

  render() {
    const SubMenu = Menu.SubMenu;
    const collapse = this.state.collapse;
    return (
      <div className={collapse ? (styles.antLayoutAsideCollapse + " " +  styles.antLayoutAside ) : styles.antLayoutAside} >
        <aside className={styles.antLayoutSider} >
          <div className={styles.antLayoutLogo}>Yak</div>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['user']} className={styles.antMenu} >
            <Menu.Item key="user" className={styles.antMenuItem}>
              <Icon type="user" /><span className={styles.navText}>运行情况</span>
            </Menu.Item>
            <Menu.Item key="setting" className={styles.antMenuItem}>
              <Icon type="setting" /><span className={styles.navText}>导航二</span>
            </Menu.Item>
            <Menu.Item key="laptop" className={styles.antMenuItem}>
              <Icon type="laptop" /><span className={styles.navText}>导航三</span>
            </Menu.Item>
            <Menu.Item key="notification" className={styles.antMenuItem}>
              <Icon type="notification" /><span className={styles.navText}>导航四</span>
            </Menu.Item>
            <Menu.Item key="folder" className={styles.antMenuItem}>
              <Icon type="folder" /><span className={styles.navText}>导航五</span>
            </Menu.Item>
          </Menu>
          <div className={styles.antAsideAction} onClick={this.onCollapseChange.bind(this)}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </aside>
        <div className={styles.antLayoutMain}>
          <div className={styles.antLayoutHeader}></div>
          <div className={styles.antLayoutBreadcrumb}>
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>应用列表</Breadcrumb.Item>
              <Breadcrumb.Item>某应用</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.antLayoutContainer}>
            <div className={styles.antLayoutContent}>
              <div className={styles.antLayoutContentZone}>
                内容区域
              </div>
            </div>
          </div>
          <div className={styles.antLayoutFooter}>
          VTT 版权所有 © 2016
          </div>
        </div>
      </div>
    );
  }

}

export default MainLayout;

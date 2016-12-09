import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Menu, Breadcrumb, Icon } from 'antd';
import styles from "./mainlayout.css";
import { Link } from 'dva/router';

class MainLayout extends Component {

  constructor(props){
    super(props);
    console.log(this.props.location.pathname);
    this.state = {
      collapse: true,
      SubMenuAnaOpened: false
    };
  }

  onSubMenuAnaChange(event){
    this.setState(...this.state, {SubMenuAnaOpened: !this.state.SubMenuAnaOpened})
  }

  onCollapseChange() {
    if(!this.state.collapse){
      let subMenuAnalysisText = this.refs.generate_report;
      if(this.state.SubMenuAnaOpened){
        subMenuAnalysisText.click();
      }
    }
    this.setState({
      collapse: !this.state.collapse,
    })
  }

  getMenuKeyFromUrl(pathname){
    if(pathname != "/"){
      return(pathname.replace(/\//g,"_"));
    }else{
      return "dashboard";
    }

  }

  render() {
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;
    const collapse = this.state.collapse;
    return (
      <div className={collapse ? (styles.antLayoutAsideCollapse + " " +  styles.antLayoutAside ) : styles.antLayoutAside} >
        <aside className={styles.antLayoutSider} >
          <div className={styles.antLayoutLogo}></div>

          <Menu
             mode="inline"
             theme="dark"
             defaultSelectedKeys={['dashboard']}
             className={styles.antMenu}
             selectedKeys={[this.getMenuKeyFromUrl(this.props.location.pathname)]}
          >

            <Menu.Divider/>
            <Menu.Item key="_dashboard" className={styles.antMenuItem}>
              <Link to="/dashboard">
                <Icon type="pie-chart" />
                <span className={styles.navText}>运行情况</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="setting" className={styles.antMenuItem}>
              <Icon type="setting" /><span className={styles.navText}>用户场景</span>
            </Menu.Item>
            <Menu.Item key="laptop" className={styles.antMenuItem}>
              <Icon type="laptop" /><span className={styles.navText}>场景执行</span>
            </Menu.Item>

            <Menu.Item  key="_analysis" className={styles.antMenuItem} >
              <Link to="/analysis">
                <Icon type="area-chart" />
                <span className={styles.navText} >数据分析</span>
              </Link>
            </Menu.Item>

            <SubMenu
              className={styles.antMenuItem}
              key="generate_report"
              title={
                      <span>
                        <Icon type="export" />
                        <span className={styles.navText} ref="generate_report" >导出报告</span>
                      </span>
                    }
              disabled={collapse}
              onTitleClick={this.onSubMenuAnaChange.bind(this)}
            >

              <MenuItemGroup  title="报告类型">
                <Menu.Item  key="1">PDF类型</Menu.Item>
                <Menu.Item  key="2">HTML类型</Menu.Item>
              </MenuItemGroup>

            </SubMenu>

            <Menu.Item key="folder" className={styles.antMenuItem}>
              <Icon type="folder" /><span className={styles.navText}>历史存档</span>
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
                {this.props.children}
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

//属性定义
MainLayout.PropTypes = {
  //当前的url路径
  location: PropTypes.any,
  //布局下的子页面
  children: PropTypes.any
}

export default MainLayout;

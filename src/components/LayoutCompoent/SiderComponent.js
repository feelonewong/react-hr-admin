import React, { Component } from "react";
import "./LayoutComponent.scss";
import {Link, withRouter} from "react-router-dom";
import { Menu } from "antd";
import Router from "../router/index";
import {AppstoreOutlined, DoubleRightOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;

class SiderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys:[],
      selectedKeys:[],
    };
  }
  componentDidMount(){
    const pathname = this.props.location.pathname
    const menuKeys = pathname.split("/").slice(0,3).join("/");
    this.setState({
      selectedKeys: [pathname],
         openKeys:[menuKeys]
    })
  }
  openMenu = (keys)=>{
    this.setState({
      openKeys:[keys[keys.length-1]]
    })
  }
  renderSubMenu = ({ key, title, child }) => {
    return(
      <SubMenu key={key} title={title} icon={<DoubleRightOutlined />} >
        {
          child&&child.map( item=>{
            return  item.child&&item.child.length>0?this.renderSubMenu(item):this.renderMenu(item)
          })
        }
      </SubMenu>
    )
  };
  renderMenu = ({ key, title }) => {
    return (
      <Menu.Item key={key} icon={<AppstoreOutlined/>} >
        <Link to={key}>
          {title}
        </Link>
      </Menu.Item>
    )
  }
  selectMenu = ({ item, key, keyPath, domEvent })=>{
    this.setState({
      selectedKeys:[key],
      openKeys:[keyPath[keyPath.length-1]]
    })
  }
  
  render() {
    const {openKeys, selectedKeys} = this.state;
    return (
      <>
        <h1 className="logo">
          <span>Logo</span>
        </h1>
        <Menu
          onClick={this.selectMenu}
          openKeys = {openKeys}
          selectedKeys ={selectedKeys}
          mode="inline"
          onOpenChange = {this.openMenu}
          theme="dark"

        >
          {Router && Router.map(item => {
            return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item);
          })}
        </Menu>
      </>
    );
  }
}

export default withRouter(SiderComponent);

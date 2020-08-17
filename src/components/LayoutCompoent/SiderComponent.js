import React, { Component } from "react";
import "./LayoutComponent.scss";
import {Link} from "react-router-dom";
import { Menu } from "antd";
import Router from "../router/index";
const { SubMenu } = Menu;
class SiderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderSubMenu = ({ key, title, child }) => {
    return(
      <SubMenu key={key} title={title}>
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
      <Menu.Item key={key}>
        <Link to={key}>
          {title}
        </Link>
      </Menu.Item>
    )
  }
  render() {
    return (
      <>
        <h1 className="logo">
          <span>Logo</span>
        </h1>
        <Menu
          onClick={this.handleClick}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
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

export default SiderComponent;

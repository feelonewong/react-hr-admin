import React, { Component } from 'react';
import { Layout,Button } from 'antd';
import SiderComponent from "../../components/LayoutCompoent/SiderComponent";
import "./index.scss";
import Container from "../../components/Container/index";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons"
const { Sider, Content, Header } = Layout;

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
    }
    toggleCollapsed = ()=>{
        const status = this.state.collapsed;
        this.setState({
            collapsed: !status
        })
    }
    render() {
        const {collapsed}  = this.state
        return (
            <>
                <Layout className="layout-wrapper">
                    <Sider width="250px" collapsed={collapsed}>
                        <SiderComponent />
                    </Sider>
                    <Layout>
                        <Header className="layout-header">
                            <Button type="primary" onClick={this.toggleCollapsed} >
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                            </Button>
                        </Header>
                        <Content className="layout-content">
                            <Container />
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}

export default Index;
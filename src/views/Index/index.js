import React,{ Component} from 'react';
import {Layout} from 'antd';
import SiderComponent from "../../components/LayoutCompoent/SiderComponent";
import "./index.scss";
import Container from "../../components/Container/index";
const {Sider, Content, Header} = Layout;
class Index extends Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return(
            <>
                <Layout className="layout-wrapper">
                    <Sider width="250px">
                        <SiderComponent/>
                    </Sider>
                    <Layout>
                        <Header className="layout-header">header</Header>
                        <Content className="layout-content">
                            <Container/>
                        </Content>
                    </Layout>
                </Layout>   
            </>
        )
    }
}

export default Index;
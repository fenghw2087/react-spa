import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;
import './index.less';

import { BrowserRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom';
import ReactDOM from "react-dom";
import routeConfig, {Page403} from "./router/routeConfig";
import LoginPage from "./page/login/login";
import {emitter} from "./common/config";
import CommonHeader from "./component/commonHeader";
import getLocalStorage from "./jq-component/util/lib/getLocalStorage";

class SiderDemo extends React.Component {
    state = {
        collapsed: false,
        login:!!getLocalStorage('islogin')
    };

    componentWillMount(){
        emitter.on('login',()=>{
            this.setState({ login:true })
        })
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        if(!this.state.login){
            return <LoginPage/>
        }
        return (
            <BrowserRouter basename={ '/' }>
                <Layout id="components-layout-outer" style={{ height:'100%' }}>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo" />
                        {
                            routeConfig.map((v,i)=>{
                                return <NavLink replace className="nav_link" key={i} to={ v.path }>{ v.name }</NavLink>
                            })
                        }
                    </Sider>
                    <Layout>
                        <Header className="header" style={{ background: '#fff', padding: 0 }}>
                            <CommonHeader/>
                        </Header>
                        <Layout style={{ minHeight: 280,overflowY:'auto',marginTop:8 }}>
                            <Content style={{ padding:20,margin:10,background:'#fff' }}>
                                <Switch>
                                    {
                                        routeConfig.map((v,i)=>{
                                            if(v.deny){
                                                return <Redirect key={i} to="/403" from={ v.path } />
                                            }
                                            return <Route key={i} path={ v.path } component={ v.component } exact />
                                        })
                                    }
                                    <Route path="/403" component={ Page403 } />
                                    <Redirect to="/index" from="/" />
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </BrowserRouter>

        );
    }
}

ReactDOM.render(
    <SiderDemo />,
    document.getElementById('root'));

import React from 'react';
import style from './less/login.less';
import { Input, Icon, Button, message } from 'antd';
import {basePath, emitter} from "../../common/config";
import setLocalStorage from "../../jq-component/util/lib/setLocalStorage";


let verCodeSrc = '';
if(process.env.NODE_ENV === 'dev'){
    verCodeSrc = '/api/kaptcha.jpg?type=login'
}else {
    verCodeSrc = `${ basePath }kaptcha.jpg?type=login`
}
export default class LoginPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username:'root',
            password:'ykl123456',
            captcha:'miyi',
            verCodeSrc:verCodeSrc+'&t='+Date.now()
        }
    }

    componentWillMount(){
        //渲染开始时
    }

    componentDidMount(){
        //渲染完成时
    }

    componentWillUnmount(){
        //页面卸载时
    }

    refreshVerCode=()=>{
        this.setState({ verCodeSrc: verCodeSrc+'&t='+Date.now() })
    };

    doLogin=()=>{
        const { username,password,captcha } = this.state;
        if(!username || !password || !captcha){
            message.error('请填写完成再登录')
        }
        setLocalStorage('islogin','123');
        emitter.emit('login',1);
    };

    render(){
        return <div className={ style.outer }>
            <Input
                placeholder="用户名"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                value={this.state.username}
                onChange={e=>this.setState({ username:e.target.value })}
            />
            <Input
                style={{ marginTop:30 }}
                placeholder="密码"
                prefix={<Icon type="lock" theme="outlined" style={{ color: 'rgba(0,0,0,.25)' }} />}
                value={this.state.password}
                onChange={e=>this.setState({ password:e.target.value })}
            />
            <Input
                style={{ marginTop:30 }}
                placeholder="图形验证码"
                className={ 'no-right' }
                prefix={<Icon type="code" theme="outlined" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={ <img onClick={ this.refreshVerCode} src={ this.state.verCodeSrc } style={{ height:32 }} /> }
                value={this.state.captcha}
                onChange={e=>this.setState({ captcha:e.target.value })}
            />
            <div className="flexbox jcc" style={{ marginTop:30 }}>
                <Button size="large" type="primary" style={{ width:150 }} onClick={ this.doLogin }>登 录</Button>
            </div>
        </div>
    }

}

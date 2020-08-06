import React,{Component,Fragment} from 'react';
import {Button, message} from "antd";
import {getCode} from "../../api/account";
let timer = null;
class Code extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:"",
            codeButtonLoading:false,
            codeButtonDisabled: false,
            codeButtonText: "获取验证码"
        }
    }
    componentWillReceiveProps({username, codeButtonDisabled}){
        this.setState({
            username,
            codeButtonDisabled
        })
    }
    componentWillUnmount(){
        clearInterval(timer);
    }
    getCode = () => {
        console.log(this.state.username,'---');
        if (!this.state.username) {
            message.error('用户名不能为空!');
            return false;
        }
        
        this.setState({
            codeButtonLoading: true,
            codeButtonText: "发送中"
        })  
        
        let requestData = {
            username:   this.state.username,
            module: "login"
        }
        getCode(requestData).then((response) => {
            this.countDown();
        }).catch(err => {
            this.setState({
                codeButtonLoading: false,
                codeButtonText: "重新获取"
            })
        })
    };
    countDown = ()=>{
        let sec = 60;
        this.setState({
            codeButtonDisabled: true,
            codeButtonText: `${sec}s`,
            codeButtonLoading: false
        })
        

        timer = setInterval(()=>{
            sec--;
            this.setState({
                codeButtonDisabled: true,
                codeButtonText: `${sec}s`
            })
            if(sec<=0){
                this.setState({
                    codeButtonDisabled: false,
                    codeButtonText:"重新发送"
                })
                clearInterval(timer);
                return false;
            }
        },1000)
    }
    render(){
        const {codeButtonDisabled,codeButtonLoading, codeButtonText} = this.state
        return(
            <Fragment>
                <Button 
                    type="primary" 
                    loading={codeButtonLoading}
                    disabled={codeButtonDisabled}
                    onClick={this.getCode}
                    block 
                    >{codeButtonText}</Button>
            </Fragment>
        )
    }

}

export default Code;
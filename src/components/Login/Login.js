import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.onFinish = this.onFinish.bind(this);
        this.handleLoginForm = this.handleLoginForm.bind(this);
    }
    onFinish(values) {
        // console.log('Received values of form: ', values);
        this.setState(values);
        this.checkLogin();
    }
    handleLoginForm(login) {
        this.props.handleLogin(login);
        if(login) {
            this.props.history.push("/");
        }
    }
    checkLogin(){
        let { username, password } = this.state;
        let url = `http://www.dell-lee.com/react/api/login.json?user=${username}&password=${password}`;
        axios.get(url,{
            withCredentials: true
        })
            .then(res => {
                let login = res.data.data.login;
                if (login) {
                    message.success('Login Successfully!');
                    this.props.handleUserInfo(username);
                }else {
                    message.error('Login Failed! Check you username and password.');
                }
                this.handleLoginForm(login);
            })
    }
    render() {
        return(
            <div>
                <Form
                  name="normal_login"
                  className="login-form"
                  onFinish={this.onFinish}
                >
                    <div className="login-title">Login</div>
                    <Form.Item
                      name="username"
                      rules={[{required: true, message: 'Please input your username'}]}
                    >
                        <Input
                          prefix={<UserOutlined className="site-form-item-icon"/>}
                          placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item 
                      name="password"
                      rules={[{required: true, message: 'Please input your password'}]}
                    >
                        <Input
                          prefix={<LockOutlined className="site-form-item-icon"/>}
                          placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default withRouter(Login);
import './Header.css';
import React, { Component } from 'react';
import axios  from 'axios';
import { Menu, Button, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import logo from './logo.png';

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
           menuList: []
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    componentDidMount() {
        axios.get('/data/Header.json')
             .then(res => {
                let data = res.data.data;
                this.setState({
                    menuList: data
                })
             })
    }
    getMenuItems() {
        let menuList = this.state.menuList;
        return menuList.map(item => {
            return (
                <Menu.Item key={item.id}>
                    <Link to={`/${item.id}`}>
                        {item.title}
                    </Link>
                </Menu.Item>
            );
        })
    }
    handleLogin() {
        this.props.history.push("/login");
    }
    handleLogout() {
        axios.get('http://www.dell-lee.com/react/api/logout.json',{
            withCredentials: true
        })
            .then(res =>{
                const data = res.data.data;
                console.log(data);
                if (data.logout) {
                    this.props.handleLogToggle(false);
                    message.info("You've already log out!");
                    this.props.history.push("/");
                }
            })
    }
    render() {
        return (
            <div className="header-nav">
                <Link to="/">
                    <img className="header-logo" src={logo} alt="header logo"/>
                </Link>
                <Menu mode="horizontal" className="header-menu">
                    {this.getMenuItems()}
                </Menu>
                <div className="login">
                    {
                        this.props.loginState ?
                        <Button type="primary" className="logout-btn" onClick={this.handleLogout}>Logout</Button> :
                        <Button type="primary" className="login-btn" onClick={this.handleLogin}>Login</Button>
                    }
                </div>
                <div className="profile">
                    <Link to="/profile">
                    <Button>Profile</Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default withRouter(AppHeader);
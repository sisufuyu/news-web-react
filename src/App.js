import './App.css';
import React, { Component } from 'react';
import { Layout } from 'antd';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import axios  from 'axios';

import AppHeader from './components/Header/Header';
import Login from './components/Login/Login';
import Profile from './components/Profile/profile';
import AppList from './components/List/List';
import Detail from './components/Deatil/Detail';

const { Header, Footer, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      loginState: false,
      username: ''
    }
    this.handleLogToggle = this.handleLogToggle.bind(this);
    this.SetUserInfo = this.SetUserInfo.bind(this);
  }
  handleLogToggle(loginState) {
    this.setState({loginState});
  }
  SetUserInfo(info) {
    this.setState({
      username: info
    })
  }
  componentDidMount() {
    axios.get('http://www.dell-lee.com/react/api/isLogin.json',{
            withCredentials: true
        })
            .then(res=>{
                const data = res.data.data;
                this.setState({
                    loginState: data.login
                })
            })
  }
  render() {
    // console.log(this.state.loginState)
    return (
      <BrowserRouter>
      <Layout style={{minWidth: "1300px", height: "100%"}}>
        <Header className="header">
          <AppHeader loginState={this.state.loginState} handleLogToggle={this.handleLogToggle}/>
        </Header>
        <Content className="content">
            <Switch>
              <Route path="/login">
                <Login loginState={this.state.loginState} handleLogin={this.handleLogToggle} handleUserInfo={this.SetUserInfo}/>
              </Route>
              <Route path="/profile">
                <Profile loginState={this.state.loginState} username={this.state.username}/>
              </Route>
              <Route path="/detail/:id">
                <Detail/>
              </Route>
              <Route path="/:id?">
                <AppList/>
              </Route>
            </Switch>
        </Content>
        <Footer className="footer">@copyright Yu Fu 2021</Footer>
      </Layout>
      </BrowserRouter>
    );
  }
}

export default App;

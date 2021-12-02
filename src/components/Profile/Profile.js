import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Card } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

class Profile extends Component {
    render() {
        const login = this.props.loginState;
        const username = this.props.username;
        if(login) {
            return(
                <Card title={username}>
                    <p>Hello! <SmileOutlined/></p>
                </Card>
            );
        } else {
            return(
                <Redirect to="/login" />
            )
        }
        
    }
}

export default Profile;

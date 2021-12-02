import React, { Component } from 'react';
import { List } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class AppList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentWillReceiveProps(nextProps) {
        let id = nextProps.match.params.id;
        let url = 'http://www.dell-lee.com/react/api/list.json?id=' + id;
        if(id !== this.props.match.params.id)
        {
            axios.get(url)
            .then(res => {
                let list= res.data.data;
                this.setState({
                    data: list
                })
            })
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        let url = 'http://www.dell-lee.com/react/api/list.json';
        if(id) url = url + '?id=' + id;
        axios.get(url)
            .then(res => {
                let list= res.data.data;
                this.setState({
                    data: list
                })
            })
    }
    render() {
        return(
            <List
            style={{
                backgroundColor: "#fff"
            }}
            bordered
            dataSource={this.state.data}
            renderItem={item => 
                <List.Item>
                    <Link to={`/detail/${item.id}`}>{item.title}</Link>  
                </List.Item>   
            }
          />
        );
    }
}

export default withRouter(AppList);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'antd';
import './Detail.css';
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get('http://www.dell-lee.com/react/api/detail.json?id=' + id)
            .then(res => {
                let data = res.data.data;
                this.setState(data);
            })
    }
    render() {
        return(
            <Card title={this.state.title}>
                <div className="detail-content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
            </Card>
        );
    }
}

export default withRouter(Detail);

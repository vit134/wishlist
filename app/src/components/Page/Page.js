import React, { Component } from 'react';

import List from '../List/List';
import Filters from '../Filters/Filters';

import { Spin } from 'antd';


export default class Page extends Component {
    render() {
        const { isFetching } = this.props.page;
        return (
            <div className="ib page">
                <Spin spinning={isFetching}>
                    <Filters {...this.props} />
                    <List {...this.props}/>
                </Spin>
            </div>
        );
    }
}

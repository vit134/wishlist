import React, { Component } from 'react';

import List from '../List/List';
import './profile.css';

import { Spin, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export default class Page extends Component {
    render() {
        const { isFetching } = this.props.page;
        return (
            <div className="ib profile">
                <Spin spinning={isFetching} wrapperClassName="profile__container">
                    <Tabs tabBarStyle={{display: 'flex', justifyContent: 'flex-end'}}>
                        <TabPane tab="Wishes" key="1">
                            <List {...this.props} />
                        </TabPane>
                        <TabPane tab="Settings" key="2">Settings Here</TabPane>
                    </Tabs>
                </Spin>
            </div>
        );
    }
}

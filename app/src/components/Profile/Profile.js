import React, { Component } from 'react';

import List from '../List/List';
import Settings from '../ProfileSettings/ProfileSettings';
import './profile.css';

import { Spin, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export default class Page extends Component {
    render() {
        const pageFetching = this.props.page.isFetching;
        const userFetching = this.props.user.isFetching;

        return (
            <div className="ib profile">
                <div className="profile__container">
                    <Tabs tabBarStyle={{display: 'flex', justifyContent: 'flex-end'}}>
                        <TabPane tab="Wishes" key="1">
                            <Spin spinning={pageFetching} wrapperClassName="profile__container">
                                <List {...this.props} />
                            </Spin>
                        </TabPane>
                        <TabPane tab="Settings" key="2">
                            <Spin spinning={userFetching} wrapperClassName="profile__container">
                                <Settings {...this.props} />
                            </Spin>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

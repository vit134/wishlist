import React, { Component } from 'react';
import UserInfo from '../UserInfo/UserInfo';

import './some-user.css';

import { Spin, List, Avatar } from 'antd';

export default class Page extends Component {
  render() {
    const { isFetching } = this.props.page;
    const userWishes = this.props.page.data.body;

    return (
      <div className="ib some-user">
        <div className="some-user__container">
          <UserInfo {...this.props}/>
          <Spin spinning={isFetching}>
            <List
              itemLayout="horizontal"
              dataSource={this.props.page.data.body}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href={item.link}>{item.name}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </Spin>
        </div>
      </div>
    );
  }
}

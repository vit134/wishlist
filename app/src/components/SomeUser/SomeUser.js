import React, { Component } from 'react';
import UserInfo from '../UserInfo/UserInfo';

import './some-user.css';

import { Spin, List, Avatar, Checkbox } from 'antd';

export default class SomeUserComponent extends Component {
  onAssign = (e) => {
    console.log(e.target.checked)
  }
  render() {
    const { isFetching } = this.props.page;

    return (
      <div className="ib some-user">
        <div className="some-user__container">
          <UserInfo user={this.props.user.some_user}/>
          <Spin spinning={isFetching}>
            <List
              itemLayout="horizontal"
              dataSource={this.props.page.data.body}
              renderItem={item => (
                <List.Item
                  actions={[
                    item.assigned ? <span>{item.assigned}</span> : <Checkbox onChange={this.onAssign} />
                  ]}
                  style={{padding: '15px 24px'}}
                >
                  <List.Item.Meta
                    avatar={<Avatar
                      src={item.image && `http://localhost:8888/${item.image.replace('./uploads/', '')}`}
                      icon={!item.image && 'picture'}
                      shape="square"
                      size={64}
                    />}
                    title={<a href={item.link}>{item.name}</a>}
                    description={item.last_login && `Last login: ${item.last_login}`}
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

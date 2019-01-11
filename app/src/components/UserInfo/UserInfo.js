import React from 'react';

import { Skeleton, Card, Avatar, Icon } from 'antd';
import moment from "moment";

import './UserInfo.css';

const { Meta } = Card;

const description = (user) => {
  if (user.online) {
    return (
      <div className="user-info__online">
        <Icon type="check-circle" style={{ fontSize: '20px' }} theme="twoTone" twoToneColor="#52c41a" />
        <span>Online</span>
      </div>
    )
  }

  return `Last login: ${moment(user.last_login).fromNow()}`
}

export default (props) => {
  const { isFetching, data } = props.user;
  const { firstname, lastname, avatar } = data || {};
  return (
    <div className="user-info">
      <Card>
        <Skeleton loading={isFetching} avatar active>
          <Meta
            avatar={<Avatar shape="square" size={64} src={avatar} icon={!avatar ? 'user' : undefined} />}
            title={`${firstname} ${lastname}`}
            description={data && description(data)}
          />
        </Skeleton>
      </Card>
    </div>
  )
}
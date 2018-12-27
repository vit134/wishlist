import React from 'react';

import { Skeleton, Card, Avatar } from 'antd';

const { Meta } = Card;

export default (props) => {
  const { isFetching, data } = props.user;
  const { firstname, lastname, avatar, description } = data || {};

  return (
    <div className="user-info">
      <Card>
        <Skeleton loading={isFetching} avatar active>
          <Meta
            avatar={<Avatar shape="square" size={64} src={avatar} icon={!avatar ? 'user' : undefined} />}
            title={`${firstname} ${lastname}`}
            description={description}
          />
        </Skeleton>
      </Card>
    </div>
  )
}
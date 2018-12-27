import React from 'react';

import { Skeleton, Card, Avatar } from 'antd';

const { Meta } = Card;

export default (props) => {
  const { isFetching, user_info } = props.user;
  const { firstname, lastname } = user_info;

  return (
    <div className="user-info">
      <Card>
        <Skeleton loading={isFetching} avatar active>
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={`${firstname} ${lastname}`}
            description="This is the description"
          />
        </Skeleton>
      </Card>
    </div>
  )
}
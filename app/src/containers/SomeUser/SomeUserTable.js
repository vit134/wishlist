import React from 'react';
import { SERVER_URL } from '../../config/urls';
import { Checkbox, Table, Spin, Card, Tabs, } from 'antd';
import Tags from '../../components/Tag/Tag';
import LoginForm from '../../components/Forms/LoginForm';
import IntroduceForm from '../../components/Forms/IntroduceForm';

const { Column } = Table;

const { TabPane } = Tabs;

const AsssignModal = (props) => {

  const updateWishOnLogin = (response) => {
    const { updateWish, data } = props;
    const { firstname, lastname } = response.user;

    updateWish({ ...data, assigned: `${firstname} ${lastname}` })
  }

  return (
    <Card
      className="form__card"
      title="Sign in or introduce yourself"
    >
      <Tabs tabBarStyle={{ maxWidth: '300px' }}>
        <TabPane tab="Login" key="1">
          <LoginForm {...props} callback={updateWishOnLogin}/>
        </TabPane>
        <TabPane tab="introduce" key="2">
          <IntroduceForm {...props}/>
        </TabPane>
      </Tabs>
    </Card>
  )
}

export default class SomeUserTable extends React.Component {
  
  state = {
    wishUpdating: false
  }

  onAssign = (e, data) => {
    const { toggleOverlay } = this.props.overlayActions;
    const { user } = this.props;
    const { isLogin } = user;
    const { updateWish } = this.props.pageActions;

    if (!isLogin) { 
      toggleOverlay(
        <AsssignModal
          {...this.props}
          data={data}
          toggleOverlay={toggleOverlay}
          updateWish={updateWish}
          
        />
      )
    } else {
      updateWish({ ...data, assigned: `${user.user_info.firstname} ${user.user_info.lastname}` })
    }
  }

  render() {
    const data = this.props.page.data.body;

    return (
      <Table
        dataSource={data}
        rowKey={({_id}) => _id}
        pagination={data && data.length > 10}
      >
        <Column
          title='Name'
          dataIndex='name'
          render={(text, data) => {
            const imgSrc = data.image && data.image.indexOf('http') < 0
              ? `${SERVER_URL}/${data.image.replace('./uploads/', '')}`
              : data.image;
            return (
              <div className="list__col_name">
                {data.image && <img src={imgSrc} alt={text} />}
                <a target="_blank" rel="noopener noreferrer" href={data.link}>{text}</a>
              </div>
            )
          }
          }
        />
        <Column
          title='Tags'
          dataIndex='tags'
          render={tags => {
            return <Tags tags={tags} />
          }
          }
        />
        <Column
          title='Category'
          dataIndex='category'
          render={category => {
            return <Tags tags={category} />
          }}
        />
        <Column
          title='Assigned'
          dataIndex='assigned'
          render={(assign, data) => {
            return (
              <div style={{display: 'flex', alignItems: 'center'}}>
                { !assign && (
                  <Spin spinning={this.state.wishUpdating}>
                    <Checkbox
                      defaultChecked={assign !== ''}
                      onChange={(e) => this.onAssign(e, data)}
                    ></Checkbox>
                  </Spin>
                )}
                <span style={{marginLeft: '10px'}}>{assign !== '' ? <>{assign}</> : 'assign to me'}</span>
              </div>
            )
          }
          }
        />
      </Table>
    )
  }
}
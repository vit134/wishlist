import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import './profile.css';

import { Spin, Tabs } from 'antd';
import List from '../../components/List/List';
import Settings from '../../components/ProfileSettings/ProfileSettings';

import * as userActions from '../../actions/UserActions';
import * as pageActions from '../../actions/PageActions';
import * as overlayActions from '../../actions/OverlayActions';

const TabPane = Tabs.TabPane;

class ProfileContainer extends Component {
  componentDidMount() {
    const { getWhishes } = this.props.pageActions;
    const { checkLogin } = this.props.userActions;

    checkLogin().then(() => {
      return getWhishes(this.props.user.user_info._id);
    })
    
  }

  render() {
    const pageFetching = this.props.page.isFetching;
    const userFetching = this.props.user.isFetching;

    return (
      <div className="ib profile">
        <div className="profile__container">
          <Tabs tabBarStyle={{ display: 'flex', justifyContent: 'flex-end' }}>
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

const mapStateToProps = store => {
  return {
    user: store.user,
    overlay: store.overlay,
    page: store.page
  };
};

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    overlayActions: bindActionCreators(overlayActions, dispatch),
    pageActions: bindActionCreators(pageActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);

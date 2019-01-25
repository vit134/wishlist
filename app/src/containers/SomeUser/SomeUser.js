import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Spin } from 'antd';

import UserInfo from '../../components/UserInfo/UserInfo';
import SomeUserTable from './SomeUserTable';
import './some-user.css';

import * as userActions from '../../actions/UserActions';
import * as pageActions from '../../actions/PageActions';
import * as overlayActions from '../../actions/OverlayActions';

class SomeUserContainer extends Component {
  componentDidMount() {
    const { getWhishes } = this.props.pageActions;
    const { getUserInfo } = this.props.userActions;
    const { id } = this.props.match.params;

    getWhishes(id);
    getUserInfo(id);
  }

  render() {
    const { isFetching } = this.props.page;

    return (
      <div className="ib some-user">
        <div className="some-user__container">
          <div className="some-user__user-info">
            <UserInfo user={this.props.user.some_user} />
          </div>
          <div className="some-user__table">
            <Spin spinning={isFetching}>
              <SomeUserTable
                data={this.props.page.data.body}
                {...this.props}
              />
            </Spin>
          </div>
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
)(SomeUserContainer);

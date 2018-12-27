import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Page from '../../components/Page/Page';

import * as userActions from '../../actions/UserActions';
import * as pageActions from '../../actions/PageActions';
import * as overlayActions from '../../actions/OverlayActions';

class Test extends Component {
  componentDidMount() {
    const { getWhishes } = this.props.pageActions;
    getWhishes(this.props.user.user_info._id);
  }

  /* componentWillReceiveProps(prev, next) {
    const prevUser = prev.user;
    const currentUser = this.props.user.isLogin;
    const { getWhishes } = this.props.pageActions;

    if (prevUser.isLogin && prevUser.isLogin !== currentUser) {
      //getWhishes(prevUser.user_info._id);
    }
  } */

  render() {
    return <Page {...this.props} />
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
)(Test);

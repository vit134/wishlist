import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Profile from '../../components/Profile/Profile';

import * as userActions from '../../actions/UserActions';
import * as pageActions from '../../actions/PageActions';
import * as overlayActions from '../../actions/OverlayActions';

class ProfileContainer extends Component {
  componentDidMount() {
    const { getWhishes } = this.props.pageActions;
    const { checkLogin } = this.props.userActions;

    checkLogin().then(() => {
      return getWhishes(this.props.user.user_info._id);
    })
    
  }

  render() {
    return <Profile {...this.props} />
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

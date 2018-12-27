import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SomeUser from '../../components/SomeUser/SomeUser';

import * as userActions from '../../actions/UserActions';
import * as pageActions from '../../actions/PageActions';
import * as overlayActions from '../../actions/OverlayActions';

class SomeUserContainer extends Component {
  componentDidMount() {
    const { getWhishes } = this.props.pageActions;
    const { id } = this.props.match.params;

    getWhishes(id);
  }

  render() {
    return <SomeUser {...this.props} />
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

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../../actions/UserActions';
import * as overlayActions from '../../actions/OverlayActions';

import RegForm from '../../components/Forms/RegForm';

class RegFormContainer extends Component {
    render() {
        return <RegForm {...this.props}/>
    }
}

const mapStateToProps = store => {
    return {
        user: store.user
    };
};

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        overlayActions: bindActionCreators(overlayActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegFormContainer);

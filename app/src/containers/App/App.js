import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import User from '../../components/User/User';
import Page from '../../components/Page/Page';
import Overlay from '../../components/Overlay/Overlay';
import Logo from '../../components/Logo/Logo';
import * as pageActions from '../../actions/PageActions';
import * as userActions from '../../actions/UserActions';
import * as overlayActions from '../../actions/OverlayActions';

import './App.css';

class App extends Component {
    render() {
        const { user, page, overlay } = this.props;
        const { checkLogin, registration, logout } = this.props.userActions;
        const { toggleOverlay } = this.props.overlayActions;

        return ([
            <header>
                <div className="container">
                    <Logo />
                    <User
                        user={user}
                        checkLogin={checkLogin}
                        registration={registration}
                        logout={logout}
                        overlay={{...overlay, toggleOverlay}}
                    />
                </div>
            </header>,
            <main>
                <div className="container">
                    <Page {...page} {...this.props.pageActions} {...this.props.overlayActions}/>
                </div>
            </main>,
            <Overlay { ...overlay} toggleOverlay = {toggleOverlay}/>
        ]);
    }
}

const mapStateToProps = store => {
    return {
        user: store.user,
        page: store.page,
        overlay: store.overlay
    };
};

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        overlayActions: bindActionCreators(overlayActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

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
    componentDidMount() {
        this.clickShowUserEvent();
    }

    clickShowUserEvent() {
        const { checkLogin } = this.props.userActions;
        const { getWhishes } = this.props.pageActions;

        Promise.resolve(checkLogin())
            .then(function (response) {
                getWhishes(response);
                return response;
            });
    }

    render() {
        const { user, page, overlay } = this.props;
        const { checkLogin, registration, logout } = this.props.userActions;
        const { toggleOverlay } = this.props.overlayActions;

        return ([
            <header>
                <div className="container">
                    <Logo />
                    <User {...this.props} />
                </div>
            </header>,
            <main>
                <div className="container">
                    <Page  {...this.props}/>
                </div>
            </main>,
            <Overlay { ...this.props}/>
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

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Layout } from 'antd';

import User from '../../components/User/User';
import Page from '../../components/Page/Page';
import Overlay from '../../components/Overlay/Overlay';
import Logo from '../../components/Logo/Logo';
import * as pageActions from '../../actions/PageActions';
import * as userActions from '../../actions/UserActions';
import * as overlayActions from '../../actions/OverlayActions';

import './App.css';

const { Header, Content } = Layout;

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
        return (
            <Layout>
                <Header>
                    <div className="container">
                        <Logo />
                        <User {...this.props} />
                    </div>
                </Header>,
                <Content>
                    <div className="container">
                        <Page  {...this.props}/>
                    </div>
                </Content>,
                <Overlay { ...this.props}/>
            </Layout>
        );
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

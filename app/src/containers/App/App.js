import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import { Layout } from 'antd';

import User from '../../components/User/User';
import Overlay from '../../components/Overlay/Overlay';
import Profile from '../../containers/Profile/Profile';
import SomeUser from '../../containers/SomeUser/SomeUser';
import Logo from '../../components/Logo/Logo';
import * as pageActions from '../../actions/PageActions';
import * as userActions from '../../actions/UserActions';
import * as overlayActions from '../../actions/OverlayActions';

import './App.css';

const { Header, Content } = Layout;

class App extends Component {
    componentDidMount() {
        const { checkLogin } = this.props.userActions;
        checkLogin();
    }

    render() {
        return (
            <Router>
                <Layout>
                    <Header>
                        <div className="container">
                            <Link to="/"><Logo /></Link>
                            <User {...this.props} />
                        </div>
                    </Header>
                    <Content>
                        <div className="container">
                            <Route
                                path="/profile"
                                render={props => {
                                    return this.props.user.isLogin
                                        ? <Profile {...props} {...this.props} />
                                        : <Redirect to={{ pathname: "/", state: { from: props.location }}}/>
                                }}
                            />
                            <Route path="/user/:id" render={props => <SomeUser {...props} {...this.props} />} />
                        </div>
                    </Content>
                    <Overlay { ...this.props}/>
                </Layout>
            </Router>
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

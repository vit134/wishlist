import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Layout, Button } from 'antd';

import User from '../../components/User/User';
//import Page from '../../components/Page/Page';
import Overlay from '../../components/Overlay/Overlay';
import Profile from '../../containers/Profile/Profile';
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
                            <Link to="/profile"><Button type="primary">Profile</Button></Link>
                            <User {...this.props} />
                        </div>
                    </Header>
                    <Content>
                        <div className="container">
                            {/* <Page  {...this.props}/> */}
                            <Route path="/profile" render={props => <Profile {...props} {...this.props} />} />
                            <Route path="/user/:id" render={props => <SomeUserPage {...props} {...this.props} />} />
                        </div>
                    </Content>,
                    <Overlay { ...this.props}/>
                </Layout>
            </Router>
        );
    }
}

class SomeUserPage extends Component {
    state = {
        data: {
            body: []
        }
    }

    componentDidMount() {
        const { getWhishes } = this.props.pageActions;
        const { id } = this.props.match.params;

        getWhishes(id);
    }

    render() {
        console.log(this.props);
        return (
            <>
                <div>SomeUserWishes</div>
                {
                    this.props.page.data.body &&
                        this.props.page.data.body.map((el, i) => <div key={i}>{el.name}</div>)
                }
            </>
        )
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

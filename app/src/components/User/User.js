import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import { withRouter } from "react-router";

import './user.css';

import RegForm from '../../containers/Forms/RegFromContainer';
import Tooltip from '../Tooltip/Tooltip';

import { Button } from 'antd';

import Preloader from '../Preloader/Preloader';

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false
        }

        this.toggleInfo = this.toggleInfo.bind(this);
        this.renderTooltip = this.renderTooltip.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    toggleInfo(e) {
        var box = e.target.getBoundingClientRect();
        const position = {
            right: document.documentElement.clientWidth -  box.right,
            top: box.top + window.pageYOffset + box.height + 10
        };
        const tooltip = this.renderTooltip(position);
        const { toggleOverlay } = this.props.overlayActions;
        toggleOverlay(tooltip, true);
    }

    renderTooltip(position) {
        const { username } = this.props.user.user_info;
        return(
            <Tooltip position={position}>
                <div className={`user__dropdown ${this.state.dropdownOpen ? 'user__dropdown_visible' : '' }`}>
                    <div className="user__row">{username}</div>
                    <div className="user__row">
                        <Link to="/profile"><Button type="primary">Profile</Button></Link>
                        <Button type="primary" onClick={this.logoutHandler}>Выйти</Button>
                    </div>
                </div>
            </Tooltip>
        )
    }

    logoutHandler() {
        this.props.userActions.logout()
            .then(() => {
                this.props.overlayActions.toggleOverlay()
                this.props.history.push('/');
            })
    }

    renderTemplate = () => {
        const { error, isFetching, isLogin, user_info } = this.props.user;
        const { toggleOverlay } = this.props.overlayActions;

        if (isFetching) {
            return <Preloader error={error}/>;
        } else {
            if (!isLogin) {
                return (
                    <Button type="primary" onClick={() => toggleOverlay(<RegForm {...this.props} />)}>Войти</Button>
                )
            } else {
                const { lastname, firstname } = user_info;
                return (
                    <div className="user">
                        Привет,{' '}
                        <div className="user__info">
                            <span className="user__title" onClick={this.toggleInfo}>{firstname} {lastname}</span>
                        </div>
                    </div>
                )
            }
        }
    };

    render() {
        return (
            <div className="ib user">
                {this.renderTemplate()}
            </div>
        );
    }
}

export default withRouter(User)
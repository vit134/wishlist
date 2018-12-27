import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import './user.css';

import RegForm from '../../containers/Forms/RegFromContainer';
import Tooltip from '../Tooltip/Tooltip';

import { Button, Popover, Avatar } from 'antd';

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
        return(
            <Tooltip position={position}>
                <div className={`user__dropdown ${this.state.dropdownOpen ? 'user__dropdown_visible' : '' }`}>
                    <div className="user__row">
                        <Link to="/profile"><Button type="primary" className="user_button">Profile</Button></Link>
                        <Button type="primary" className="user_button" onClick={this.logoutHandler}>Выйти</Button>
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

    popoverContent = () => {
        return (
            <>
                <Button type="primary" className="user__button"><Link to="/profile">Profile</Link></Button>
                <Button type="primary" className="user__button" onClick={this.logoutHandler}>Logout</Button>
            </>
        );
    }

    renderTemplate = () => {
        const { isFetching, isLogin, user_info } = this.props.user;
        const { toggleOverlay } = this.props.overlayActions;

        if (!isLogin) {
            return (
                <Button
                    type="primary"
                    onClick={() => toggleOverlay(<RegForm {...this.props}/>)}
                    loading={isFetching}
                >
                    Войти
                </Button>
            )
        } else {
            const { lastname, firstname, image } = user_info;
            return (
                <div className="user">
                    <Avatar
                        src={image && `http://localhost:8888/${image.replace('./uploads/', '')}`}
                        icon={!image && 'user'}
                        size={34}
                    />
                    <Popover overlayClassName="user__popover" content={this.popoverContent()} title="Title" trigger="click">
                        <div className="user__info">
                            <span className="user__title">{firstname} {lastname}</span>
                        </div>
                    </Popover>
                </div>
            )
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
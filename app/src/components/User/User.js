import React from 'react';
import './user.css';

import RegForm from '../../containers/Forms/RegFromContainer';

import Preloader from '../Preloader/Preloader';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.props.checkLogin();

        this.state = {
            dropdownOpen: false
        }

        this.toggleInfo = this.toggleInfo.bind(this);
    }

    toggleInfo() {
        this.setState({dropdownOpen: !this.state.dropdownOpen})
    }

    renderTemplate = () => {
        const { error, isFetching, isLogin, user_info } = this.props.user;
        const { toggleOverlay } = this.props.overlay;

        if (isFetching) {
            return <Preloader error={error}/>;
        } else {
            if (!isLogin) {
                return (
                    <button className="btn" onClick={() => toggleOverlay(<RegForm/>)}>
                        Войти
                    </button>
                )
            } else {
                const { username, lastname, firstname } = user_info;
                return (
                    <div className="user">
                        Привет,{' '}
                        <div className="user__info">
                            <span className="user__title" onClick={this.toggleInfo}>{firstname} {lastname}</span>
                            <div className={`user__dropdown ${this.state.dropdownOpen ? 'user__dropdown_visible' : '' }`}>
                                <div className="user__row">{username}</div>
                                <div className="user__row">
                                    <button className="btn" onClick={this.props.logout}>
                                        Выйти
                                    </button>
                                </div>
                            </div>
                        </div>
                        !
                    </div>
                )
            }
        }
    };

    render() {
        return <div className="ib user">{this.renderTemplate()}</div>;
    }
}

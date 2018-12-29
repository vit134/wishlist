import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import './user.css';

import RegForm from '../../containers/Forms/RegFromContainer';
//import Tooltip from '../Tooltip/Tooltip';

import { Button, Popover, Avatar, Tooltip, Icon } from 'antd';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      popoverOpen: false
    }
  }

  logoutHandler = () => {
    this.props.userActions.logout()
      .then(() => {
        this.props.history.push('/');
      })
  }

  popoverContent = () => {
    return (
      <>
        <Button type="primary" onClick={() => this.handleClickChange(false)} className="user__button"><Link to="/profile">Profile</Link></Button>
        <Button type="primary" className="user__button" onClick={this.logoutHandler}>Logout</Button>
      </>
    );
  }

  renderUserInfo = () => {
    const { lastname, firstname, username, is_activate } = this.props.user.user_info || {};

    let userString = firstname && lastname 
      ? `${firstname} ${lastname}`
      : `${username}`;

    if (is_activate) {
      return userString
    } else {
      return (
        <Tooltip title="Your account not activated">
          {userString} <Icon type="question-circle-o" style={{fontSize: '15px'}}/>
        </Tooltip>
      )
    }
  }

  handleClickChange = visible => {
    this.setState({
      popoverOpen: visible
    });
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
      const { image, is_activate } = user_info || {};
      return (
        <div className="user">
          {
            is_activate &&
              <Avatar
                src={image && `http://localhost:8888/${image.replace('./uploads/', '')}`}
                icon={!image && 'user'}
                size={34}
              />
          }
          <Popover
            overlayClassName="user__popover"
            content={this.popoverContent()}
            trigger="click"
            visible={this.state.popoverOpen}
            onVisibleChange={this.handleClickChange}
          >
            <div className="user__info">
              <span className="user__title">
                {this.renderUserInfo()}
              </span>
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
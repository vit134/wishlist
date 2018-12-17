import React from 'react';
import './Logo.css';
import logo from './list.svg';

export default () => {
    return (
        <div className="logo">
            <img src={logo} className="logo__image" alt="logo"/>
            <div className="logo__text">Wishlist</div>
        </div>
    );
};

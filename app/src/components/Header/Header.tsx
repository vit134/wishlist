import * as React from 'react';
import './header.css';
import './Logo.css';
import logo from './logo.svg';


import Button from '../Button/Button';

export default () => {
	return(
		<header className="page__header header">
			<div className="header__inner">
				<div className="header__col">
					<div className="logo">
						<img src={logo} alt="logo"/>
					</div>
					<div className="header__title">
						WishList
					</div>
				</div>
				<div className="header__col">
					<Button type={'add'}/*  onClick={this.toggleModal} */>Добавить</Button>
				</div>
			</div>
		</header>
	);
}
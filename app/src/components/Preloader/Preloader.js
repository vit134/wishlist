import React from 'react';
import './Preloader.css';

export default ({error}) => {
	return (
		<div className={`preloader ${error && 'preloader__error'}`}>
			<div className="preloader__item-1"></div>
			<div className="preloader__item-2"></div>
			<div className="preloader__item-3"></div>
			<div className="preloader__item-4"></div>
			<div className="preloader__item-5"></div>
		</div>
	)
}
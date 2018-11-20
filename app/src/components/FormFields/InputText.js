import React from 'react';

import './InputText.css';

export default (props) => {
	return(
		<div className="input-container">
			<input {...props} type="text" className="input"/>
			{
				props.clearButton &&
					<span className="input__clear-button"></span>
			}
			<div className="input__validate">
				{
					props.valid && !props.valid.valid && props.valid.message !== '' && props.valid.message
				}
			</div>
		</div>
	)
}
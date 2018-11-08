import React from 'react';
import './Tooltip.css';

export default (props) => {
	return(
		<div className="tooltip" style={props.position}>
			{props.children}
		</div>
	)
};

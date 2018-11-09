import React from 'react';

import './Tag.css';

export default ({name, onClick}) => {
	return <span className="tag" onClick={onClick ? onClick : () => {}}>{name}</span>
}
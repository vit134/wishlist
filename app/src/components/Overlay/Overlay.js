import * as React from 'react';
import './Overlay.css';

export default ({open = false, toggleOverlay, content = ''}, props) => {
	return(
		<div className={`overlay ${open ? 'overlay_visible' : ''}`}>
			{content ? content : ''}
			<span className="overlay__close" onClick={toggleOverlay}>X</span>
		</div>
	);
};

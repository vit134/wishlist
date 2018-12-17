import * as React from 'react';
import './Overlay.css';

export default class Overlay extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
	}

	toggle(e) {
		if (e.target.classList.contains('overlay')) {
			this.props.toggleOverlay();
		}
	}

	render() {
		const { open, content = '', transparent} = this.props.overlay;
		const { toggleOverlay } = this.props.overlayActions
		console.log(open);
		return(
			<div
				className={`overlay ${open ? 'overlay_visible' : ''} ${transparent ? 'overlay_transparent' : ''}`}
				onClick={this.toggle}
			>
				{content ? content : ''}
				{!transparent &&
					<span className="overlay__close" onClick={toggleOverlay}>X</span>
				}
			</div>
		);
	}
}

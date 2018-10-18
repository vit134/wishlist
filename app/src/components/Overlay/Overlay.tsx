import * as React from 'react';
import './Overlay.css';

interface IProps {
	children: React.ReactNode;
}

export default class Overlay extends React.Component<IProps> {
	public render() {
		return(
			<div className="overlay">
				{
					React.Children.map(this.props.children, el =>
						React.cloneElement(
							el as React.ReactElement<any>
						)
					)
				}
			</div>
		);
	}
}
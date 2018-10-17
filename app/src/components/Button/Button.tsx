import * as React from 'react';
import './Button.css';

interface IProps {
	type?: string;
	onClick?: (e?: Event | React.FormEvent) => void;
	children?: JSX.Element | string;
	cls?: string;
	disabled?: boolean;
}

const Button = ({ type, onClick, cls = '', disabled = false, ...props }: IProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`button ${type ? `button_${type}` : ''} ${cls}`}
		>
			{props.children}
		</button>
	);
}

export default Button;
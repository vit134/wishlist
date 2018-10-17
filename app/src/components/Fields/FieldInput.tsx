import * as React from 'react';

import './Field.css';

interface IProps {
	name: string;
	label: string;
	type?: 'text' | 'number';
	required?: boolean;
	onChange?: () => void;
}

export default class FieldInput extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	public onChange() {
		if (this.props.onChange) {
			this.props.onChange();
		}
	}

	public render() {
		return (
			<div className="field" ref={this.props.name}>
				<label className="field__label" htmlFor={this.props.name}>{this.props.label}{this.props.required && ' *'}</label>
				<input
					className="field__input"
					type={this.props.type ? this.props.type : 'text'}
					id={this.props.name}
					name={this.props.name}
					onChange={this.onChange}
				/>
			</div>
		)
	}
}

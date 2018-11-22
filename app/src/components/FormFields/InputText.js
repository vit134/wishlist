import React from 'react';

import './InputText.css';


import { IconRemoveWhite } from '../Icon/index';

export default class InputText extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			changed: false
		}

		this.input = React.createRef();

		this.onChange = this.onChange.bind(this);
		this.clear = this.clear.bind(this);

		if (!this.props.name) throw new Error('InputText component must have name prop');
	}

	onChange(e) {
		const value = e.target.value;

		if (value && value.length > 0) {
			this.setState({changed: true})
		} else {
			this.setState({changed: false})
		}
	}

	clear(e) {
		this.input.current.value = '';
		this.setState({changed: false})
	}

	render() {
		const { placeholder, name } = this.props;
		return(
			<div className="input__container">
				<div className={`input__wrapper ${this.state.changed ? 'input__wrapper_clear' : ''}`}>
					<input ref={this.input} placeholder={placeholder} name={name} type="text" className="input" onChange={this.onChange}/>
					{
						this.props.clearButton && this.state.changed &&
							<span className="input__clear-button" onClick={this.clear}><IconRemoveWhite /></span>
					}
				</div>
				{ !this.props.valid &&
					<div className="input__validation">{this.props.validMessage}</div>
				}
				{ this.props.icon &&
					<div className="input__icon-wrapper">
						<div className="input__icon">
							{this.props.icon}
						</div>
					</div>
				}
			</div>
		)
	}
}
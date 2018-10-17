// tslint:disable: no-console
import * as React from 'react';
import * as ReactDom from 'react-dom';

import Button from '../Button/Button';

import './Form.css';

interface IProps {
	children: JSX.Element[];
	onSubmit: (e?: object) => void;
	title?: string;
	submitButton?: boolean;
	submitButtonText?: string;
	cancelButton?: boolean;
	cancelButtonText?: string;
}

interface IState {
	valid: boolean;
	changing: boolean;
}

export default class Form extends React.Component<IProps, IState> {
	private form: HTMLFormElement;
	private formFields: object;

	constructor(props: IProps) {
		super(props);

		this.submit = this.submit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.getFormFields = this.getFormFields.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.validateForm = this.validateForm.bind(this);

		this.formFields = {};

		this.state = {
			changing: false,
			valid: true
		}
	}

	public submit (e: React.FormEvent) {
		e.preventDefault();
		const validate = this.validateForm();
		if (validate) {
			this.props.onSubmit(this.formFields);
		}

		this.setState({valid: validate});
	}

	public getFormFields(): object {
		new FormData(this.form).forEach((val, name) => {
			this.formFields[name] = val;
		});

		return this.formFields;
	}

	public validateForm() {
		const vals: object = this.getFormFields();
		let validate: boolean = true;

		this.props.children.forEach((el, i) => {
			const field = ReactDom.findDOMNode(this.refs[i]) as Element;

			if (el.props.required && vals[el.props.name] === '') {
				field.classList.add('error');
				validate = false;
			} else {
				field.classList.remove('error');
			}
		})

		return validate;
	}

	public onChangeHandler() {
		if (!this.state.changing) {
			this.setState({changing: true});
			setTimeout(() => {
				const validate = this.validateForm();
				this.setState({valid: validate});
				this.setState({changing: false});
			}, 300)
		}
	}

	public onCancel() {
		this.form.reset();
	}

	public render() {
		return(
			<form className="form" onSubmit={this.submit} ref={form => form ? this.form = form : ''}>
				{this.props.title && <div className="form__title">{this.props.title}</div>}
				{
					React.Children.map(this.props.children, (el, i) => {
						return (
							<div key={i} className="form__row">
								{
									React.cloneElement(
										el as React.ReactElement<any>,
										{
											onChange: this.onChangeHandler,
											ref: i,
										}
									)
								}
							</div>
						);
					})
				}
				{
					this.props.submitButton || this.props.submitButtonText &&
						<Button
							type="submit"
							disabled={!this.state.valid}
						>
							{this.props.submitButtonText || 'Сохранить'}
						</Button>
				}
				{
					this.props.cancelButton || this.props.cancelButtonText &&
						<Button
							disabled={!this.state.valid}
							onClick={this.onCancel}
						>
							{this.props.cancelButtonText || 'Отмена'}
						</Button>
				}
			</form>
		);
	}
}
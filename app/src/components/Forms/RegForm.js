import React from 'react'
import './Forms.css';

import Preloader from '../Preloader/Preloader';

export default class RegForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mode: 'auth'
		}

		this.switch = this.switch.bind(this);
		this.submit = this.submit.bind(this);
		this.form = React.createRef();
	}

	switch(mode) {
		this.setState({ mode });
		this.form.current.reset();
	}

	getFields() {
		let formFields = {};
		new FormData(this.form.current).forEach((val, name) => {
			formFields[name] = val;
		});

		return formFields;
	}

	submit(e) {
		e.preventDefault();
		let fields = this.getFields();
		if (this.state.mode === 'reg') {
			this.props.registration(fields);
		} else {
			this.props.login(fields);
		}
	}

	componentDidUpdate() {
		if (!this.props.user.isFetching && this.props.user.user_info.username) {
			this.props.toggleOverlay();
		}
	}

	render() {
		const { isFetching } = this.props.user;
		return (
			<div className="form" onSubmit={this.submit}>
				<div className="form__inner">
					<div className="form__header">
						<div className={`form__title form__title_${this.state.mode}`}>
							<span onClick={() => this.switch('auth')}>Авторизация</span>
							<span className="form__dilimiter">/</span>
							<span onClick={() => this.switch('reg')}>Регистрация</span>
						</div>
					</div>
					{
						this.state.mode === 'reg' ?
							<form className={this.state.mode === 'reg' ? 'visible' : ''} ref={this.form}>
								<div className="form__row">
									<label htmlFor="firstname" className="label">Firstname</label>
									<input autoComplete="off" className="input" type="text" id="firstname" name="firstname" placeholder="Enter your firstname"/>
								</div>
								<div className="form__row">
									<label htmlFor="lastname" className="label">Lastname</label>
									<input autoComplete="off" className="input" type="text" id="lastname" name="lastname" placeholder="Enter your lastname"/>
								</div>
								<div className="form__row">
									<label htmlFor="username" className="label">Username</label>
									<input autoComplete="off" className="input" type="text" id="username" name="username" placeholder="Enter your username"/>
								</div>
								<div className="form__row">
									<label htmlFor="password" className="label">Password</label>
									<input autoComplete="off" className="input" type="password" id="password" name="password" placeholder="Enter your password"/>
								</div>
								<button className="btn">Save</button>
							</form>
						:
							<form className={this.state.mode === 'auth' ? 'visible' : ''} ref={this.form}>
								<div className="form__row">
									<label htmlFor="username" className="label">Username</label>
									<input autoComplete="off" className="input" type="text" name="username" placeholder="Enter your username"/>
								</div>
								<div className="form__row">
									<label htmlFor="password" className="label">Password</label>
									<input autoComplete="off" className="input" type="password" name="password" placeholder="Enter your password"/>
								</div>
								<button className="btn">
									{isFetching ? <Preloader/> : 'Save'}
								</button>
							</form>
					}
				</div>
			</div>
		);
	}
}
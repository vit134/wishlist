import React from 'react'
import './Forms.css';

import Preloader from '../Preloader/Preloader';

export default class RegForm extends React.Component {
	constructor(props) {
		super(props);

		this.submit = this.submit.bind(this);
		this.getFields = this.getFields.bind(this);

		this.form = React.createRef();

		console.log(this.props);
	}


	prepareTags(str) {
		return str.split(',').reduce((acc, val) => {
			acc.push(val.trim())
			return acc;
		}, [])
	}

	getFields() {
		let formFields = {};
		new FormData(this.form.current).forEach((val, name) => {
			formFields[name] = val;
		});

		if (formFields.tags !== '') {
			formFields.tags = this.prepareTags(formFields.tags);
		}

		return formFields;
	}

	submit(e) {
		e.preventDefault();
		let fields = this.getFields();
		console.log(this.props.addWish)
		if (fields.name && fields.link) {
			this.props.addWish(fields);
		}
		/* if (this.state.mode === 'reg') {
			this.props.registration(fields);
		} else {
			this.props.login(fields);
		} */
	}

	render() {
		return (
			<div className="form" onSubmit={this.submit}>
				<div className="form__inner">
					<div className="form__header">
						<div className='form__title'>
							<span>Новая Вишка</span>
						</div>
					</div>
					<form ref={this.form} className="visible">
						<div className="form__row">
							<label htmlFor="name" className="label">Название</label>
							<input autoComplete="off" className="input" type="text" id="name" name="name" placeholder="Название Вишки"/>
						</div>
						<div className="form__row">
							<label htmlFor="link" className="label">Ссылка</label>
							<input autoComplete="off" className="input" type="text" id="link" name="link" placeholder="Ссылка на Вишку"/>
						</div>
						<div className="form__row">
							<label htmlFor="image" className="label">Картинка</label>
							<input autoComplete="off" className="input" type="text" id="image" name="image" placeholder="Ссылка на картинку"/>
						</div>
						<div className="form__row">
							<label htmlFor="tags" className="label">Тэги</label>
							<input autoComplete="off" className="input" type="text" id="tags" name="tags" placeholder="Тэги через запятую"/>
						</div>
						<button className="btn">Добавить</button>
					</form>
				</div>
			</div>
		);
	}
}
import React from 'react'

import ImageUpload from './imageUpload';
import '../Forms.css'

import { Form, Input, Card, Select, Button } from 'antd'; 
const FormItem = Form.Item;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 10 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 14 },
	},
};

class AddWishForm extends React.Component {

	state = {
		tagsLoading: true
	}

	componentDidMount() {
		this.props.form.validateFields();

		setTimeout(() => {
			this.setState({tagsLoading: false})
		}, 2000);
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

		if (fields.name && fields.link) {
			this.props.addWish(fields);
		}
	}

	handleSubmit(e) {
		e && e.preventDefault();
		console.log('handlesubmit')
	}

	render() {

		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
		const nameError = isFieldTouched('name') && getFieldError('name');

		return (
			<Card className="addWishForm-card" title="Новая вишка">
				<Form onSubmit={this.handleSubmit}>
					<FormItem
						{...formItemLayout}
						validateStatus={nameError ? 'error' : ''}
						help={nameError || ''}
						label="Название"
					>
						{
							getFieldDecorator('name', {
								rules: [{
									required: true, message: 'Пожалуйста, введите название',
								}]
							})(
								<Input placeholder="Название" />
							)
						}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="Ссылка"
					>
						{ getFieldDecorator('link')(<Input placeholder="Ссылка" />) }
					</FormItem>
					<FormItem {...formItemLayout} label="Изображение">
						{getFieldDecorator('image')(<ImageUpload />)}
					</FormItem>
					<FormItem {...formItemLayout} label="Тэги">
						{
							getFieldDecorator('tags')
								(<Select
									showArrow={!this.state.tagsLoading}
									loading={this.state.tagsLoading}
									mode="multiple"
								>
									<Select.Option value="lucy">Lucy</Select.Option>
									<Select.Option value="lucy1">Lucy</Select.Option>
									<Select.Option value="lucy2">Lucy</Select.Option>
								</Select>)
						}
					</FormItem>
					<FormItem wrapperCol={{ xs: {span: 24 }, sm: {span: 8, offset: 8 }}}>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Log in
						</Button>
					</FormItem>
				</Form>
			</Card>
		);
	}
}

export default Form.create()(AddWishForm);

{/* <div className="form" onSubmit={this.submit}>
				<div className="form__inner">
					<div className="form__header">
						<div className='form__title'>
							<span>Новая Вишка</span>
						</div>
					</div>
					<form ref={this.form} className="visible">
						<input type="hidden" name="assigned" value=""/>
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
			</div> */}
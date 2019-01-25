import React from 'react';
import { SERVER_URL } from '../../../config/urls';
import '../Forms.css'

import { Form, Input, Card, Select, Button, Upload, Icon, message } from 'antd'; 
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

const localProps = {
	name: 'file',
	action: `${SERVER_URL}/images`,
	credentials: 'include',
	onRemove: (file) => {
		console.log('file on remove', file);
		const { tmpPath } = file.response;

		fetch(`${SERVER_URL}/images`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({tmpPath}),
			credentials: 'include'
		})
			.then(res => {
				//console.log('res', res)
				return res.json()
			})
			.then(data => {
				console.log('success', data);
			})
			.catch(e => {
				console.log('error', e);
			});

	}
};

class AddWishForm extends React.Component {

	state = {
		tagsLoading: true,
		loading: false,
		linkImage: false,
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

	hasErrors(fieldsError) {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}

	handleSubmit = (e) => {
		e && e.preventDefault();

		const { form, addWish, toggleOverlay } = this.props;

		form.validateFields((err, values) => {
			if (err) return err;
			console.log('values on submit', values);
			this.setState({loading: true}, () => {
				addWish(values)
					.then(() => {
						this.setState({loading: false})
						toggleOverlay();
					})
			})
			
		})
	}

	normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
		}
		
    return e && e.fileList;
  }

	render() {

		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
		const nameError = isFieldTouched('name') && getFieldError('name');
		const { linkImage } = this.state;

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
					<FormItem {...formItemLayout} label="Ссылка">
						{ getFieldDecorator('link')(<Input placeholder="Ссылка" />) }
					</FormItem>
					<FormItem {...formItemLayout} label="Изображение">
						<div className="form__custom-item-control">
							{ !linkImage 
								? getFieldDecorator('image', {
										valuePropName: 'fileList',
										getValueFromEvent: this.normFile,
									})(
									<Upload {...this.props} {...localProps}>
										<Button style={{width: '100%'}}>
											<Icon type="upload" /> Click to Upload
										</Button>
									</Upload>
									)
								: getFieldDecorator('image-link')(<Input placeholder="Ссылка на картинку" />)
							}
							<Button onClick={() => this.setState({linkImage: !linkImage})}>
								<Icon type={linkImage ? 'picture' : 'link'}/>
							</Button>
						</div>
					</FormItem>
					<FormItem {...formItemLayout} label="Тэги">
						{
							getFieldDecorator('tags')(
								<Select
									showArrow={!this.state.tagsLoading}
									loading={this.state.tagsLoading}
									mode="multiple"
								>
									<Select.Option value="tag1">Tag1</Select.Option>
									<Select.Option value="tag2">Tag2</Select.Option>
									<Select.Option value="tag3">Tag3</Select.Option>
								</Select>
							)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="Категории">
						{
							getFieldDecorator('category')(
								<Select
									showArrow={!this.state.tagsLoading}
									loading={this.state.tagsLoading}
									mode="multiple"
								>
									<Select.Option value="category1">Category1</Select.Option>
									<Select.Option value="category2">Category2</Select.Option>
									<Select.Option value="category3">Category3</Select.Option>
								</Select>
							)
						}
					</FormItem>
					<FormItem wrapperCol={{ xs: {span: 24 }, sm: {span: 8, offset: 8 }}}>
						<Button
							type="primary"
							loading={this.state.loading}
							htmlType="submit"
							className="login-form-button"
							disabled={this.hasErrors(getFieldsError())}>Добавить</Button>
					</FormItem>
				</Form>
			</Card>
		);
	}
}

export default Form.create()(AddWishForm);
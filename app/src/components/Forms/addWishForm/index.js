import React from 'react'

//import ImageUpload from './imageUpload';
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
	action: 'http://localhost:8888/images',
	credentials: 'include',
	/* onChange(info) {
		console.log('info', info)
		if (info.file.status !== 'uploading') {
			//console.log(info.file, info.fileList);
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	}, */
	onRemove: (file) => {
		console.log('file on remove', file);
		const { tmpPath } = file.response;

		fetch(`http://localhost:8888/images`, {
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
		loading: false
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

		this.props.form.validateFields((err, values) => {
			if (err) return err;
			console.log('values on submit', values);
			this.setState({loading: true}, () => {
				this.props.addWish(values)
					.then(() => {
						this.setState({loading: false})
						this.props.toggleOverlay();
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
						{
							getFieldDecorator('image', {
								valuePropName: 'fileList',
								getValueFromEvent: this.normFile,
							})(
								<Upload {...this.props} {...localProps}>
									<Button>
										<Icon type="upload" /> Click to Upload
									</Button>
								</Upload>
							)}
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
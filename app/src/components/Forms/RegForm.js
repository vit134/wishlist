import React from 'react'
import './Forms.css';


import {
	Form, Icon, Input, Button, Checkbox, Card, Tabs
} from 'antd';

const { TabPane } = Tabs;

class LoginForm extends React.Component {
	handleLoginSubmit = (e) => {

		e.preventDefault();
		const { login } = this.props.userActions;
		const { toggleOverlay } = this.props.overlayActions;
		const { form } = this.props;

		form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of login-form: ', values);
				login(values)
					.then(() => {
						toggleOverlay();
					})
					.catch(e => console.log(e));
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleLoginSubmit} className="login-form">
				<Form.Item>
					{getFieldDecorator('username', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true,
					})(
						<Checkbox>Remember me</Checkbox>
					)}
					<a className="login-form-forgot" href="http://">Forgot password</a>
				</Form.Item>
				<Button type="primary" htmlType="submit" className="form__button">
					Log in
				</Button>
			</Form>
		)
	}
}

class RegistrationForm extends React.Component {
	handleRegistrationSubmit = (e) => {
		e.preventDefault();

		const { registration } = this.props.userActions;
		const { form } = this.props;
		console.log(this.props);
		form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of registration-form: ', values);
				registration(values);
			}
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleRegistrationSubmit} className="registration-form">
				<Form.Item>
					{getFieldDecorator('username', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('email', {
						rules: [{
							type: 'email', message: 'The input is not valid E-mail!',
						}, {
							required: true, message: 'Please input your E-mail!',
						}],
					})(
						<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail" />
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
					)}
				</Form.Item>
				<Button loading={this.props.user.isFetching} type="primary" htmlType="submit" className="form__button">
					Send
				</Button>
			</Form>
		)
	}
}

const LoginFromCreated = Form.create()(LoginForm);
const RegistrationFromCreated = Form.create()(RegistrationForm);

export default class NormalLoginForm extends React.Component {
	render() {
		return (
			<Card className="form__card">
				<Tabs tabBarStyle={{maxWidth: '300px'}}>
					<TabPane tab="Login" key="1">
						<LoginFromCreated {...this.props} />
					</TabPane>
					<TabPane tab="Registration" key="2">
						<RegistrationFromCreated {...this.props} />
					</TabPane>
				</Tabs>
			</Card>
		);
	}
}
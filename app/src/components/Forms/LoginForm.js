import React from 'react';
import './Forms.css';
import { Form, Icon, Input, Button, Checkbox, } from 'antd';

class LoginForm extends React.Component {
  handleLoginSubmit = (e) => {

    e.preventDefault();
    console.log(this.props);
    const { login } = this.props.userActions;
    const { toggleOverlay } = this.props.overlayActions;
    const { form, callback } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of login-form: ', values);
        login(values)
          .then((response) => {
            console.log(response);
            if (callback) {
              callback(response);
            }
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

export default Form.create()(LoginForm);
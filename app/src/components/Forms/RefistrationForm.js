import React from 'react';


import {
  Form, Icon, Input, Button,
} from 'antd';

import './Forms.css';

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


export default Form.create()(RegistrationForm);
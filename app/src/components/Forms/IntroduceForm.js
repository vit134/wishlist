import React, { Component } from 'react';
import './Forms.css';

import { Form, Input, Icon, Button } from 'antd';

class IntroduceForm extends Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { updateWish, data, toggleOverlay } = this.props;

        updateWish({ ...data, assigned: values['user-info']})
          .then((data) => {
            if (data) {
              toggleOverlay();
            }
          })
      }
    });
  }


  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, } = this.props.form;
    const userNameError = isFieldTouched('userName') && getFieldError('userName');

    return (
      <Form className="form_inline" onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('user-info', {
            rules: [{ required: true }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="How to introduce you"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={this.hasErrors(getFieldsError())}
          >
            Assign
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(IntroduceForm);
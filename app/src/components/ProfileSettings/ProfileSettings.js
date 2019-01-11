import React, { Component } from 'react';

import './ProfileSettings.css';

import {
  Form, Input, List, DatePicker, Row, Col, Button, AutoComplete,
} from 'antd';

const Option = AutoComplete.Option;

class CustomSelect extends React.Component {
  render() {
    return (
      <AutoComplete
        style={{ width: '100%' }}
        size="large"
        dataSource={this.props.prepareData()}
        placeholder={this.props.placeholder || ''}
        onSelect={this.props.onSelect}
        filterOption={(inputValue, option) => {
          return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        }
      />
    )
  }
}

class ProfileSettings extends Component {
  state = {
    countries: [],
    selectedCountry: null,
    countriesFetching: false,
    cities: [],
    selectedCity: null,
    citiesFetching: false,
    totalWishes: null,
    assignedWishes: null,
    notAssignedWishes: null
  }

  prepareCountryData = () => {
    return this.state.countries.map(item => {
      return (
        <Option key={item.alpha2Code} value={item.alpha2Code}>
          {item.name}
        </Option>
      )
    }
    )
  }

  prepareCityData = () => {
    return this.state.cities.map(item => (
        <Option key={item.id} value={item.label}>
          {item.label}
        </Option>
      )
    )
  }

  getCountries = () => {
    this.setState({ countriesFetching : true})
    return fetch(`http://localhost:8888/countries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => {
        //console.log('res', res)
        return res.json()
      })
      .then(data => {
        //console.log('success', data);
        this.setState({ countriesFetching: false, countries: data })
        return data;
      })
      .catch(e => {
        //console.log('error', e);
        this.setState({ countriesFetching: false })
      });
  }

  getCities = (code) => {
    this.setState({ citiesFetching: true })
    return fetch(`http://localhost:8888/cities?country_code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => {
        //console.log('res', res)
        return res.json()
      })
      .then(data => {
        //console.log('success', data);
        this.setState({ citiesFetching: false, cities: data })
        return data;
      })
      .catch(e => {
        //console.log('error', e);
        this.setState({ citiesFetching: false })
      });
  }

  componentDidMount() {
    const { form } = this.props;

    if (this.state.countries.length === 0) {
      this.getCountries();
    }

    form.setFieldsValue(this.props.user.user_info);

    this.getCountWishes();
  }

  getCountWishes = () => {
    const wishes = this.props.page.data.body;

    if (wishes && wishes.length) {
      const totalWishes = wishes.length;
      const assignedWishes = wishes.filter(el => el.assigned).length;
      const notAssignedWishes = totalWishes - assignedWishes;

      this.setState({
        totalWishes,
        assignedWishes,
        notAssignedWishes
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
   
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of login-form: ', values);
      }
    });
  }

  onSelectCountryHandler = (value, option) => {
    const { form } = this.props;
    form.setFieldsValue({country: value})
    this.setState({ citiesFetching: true })

    this.getCities(value)
      .then((data) => {
        this.setState({
          selectedCountry: value,
          citiesFetching: false,
          cities: data
        })
      })
  }

  onSelectCityHandler = (value) => {
    const { form } = this.props;
    form.setFieldsValue({ city: value })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { firstname, lastname } = this.props.user.user_info;
    const listData = [
      {
        title: 'Wishes',
        action: [this.state.totalWishes]
      },
      {
        title: 'Assigned',
        action: [this.state.assignedWishes]
      },
      {
        title: 'Not assigned',
        action: [this.state.notAssignedWishes]
      },
    ];

    return (
      <div className="profile-settings">
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={6} className="profile-settings__col_left">
              <div className="profile-settings__avatar">
                <img
                  alt="avatar"
                  src="https://placeimg.com/300/300/any"
                  className="profile-settings__avatar-img"
                />
                <span className="profile-settings__avatar-edit">
                  <Button icon="edit" />
                </span>
              </div>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={listData}
                renderItem={item => (
                  <List.Item actions={item.action}>
                    <List.Item.Meta
                      title={item.title}
                    />
                  </List.Item>
                )}
              />
            </Col>
            <Col span={18} className="profile-settings__col_right">
              { firstname && lastname &&
                <Row>
                  <div className="profile-settings__title">
                    <span>{`${firstname} ${lastname}`}</span>
                    <Button icon="edit" />
                  </div>
                </Row>
              }
              <Row gutter={30}>
                <Col span={12}>
                  <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                      rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                      }, {
                        required: true, message: 'Please input your E-mail!',
                      }],
                    })(<Input size="large" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Username">
                    {getFieldDecorator('username', {
                      rules: [{
                        required: true, message: 'Please input your username',
                      }],
                    })(<Input size="large" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone number">
                    {getFieldDecorator('phone')(<Input size="large"/>)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Date of Birth">
                    {getFieldDecorator('date_of_birth')(<DatePicker size="large" style={{width: '100%'}} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={12}>
                  <Form.Item label="Country">
                    {getFieldDecorator('country')(
                      <CustomSelect
                        onSelect={this.onSelectCountryHandler}
                        data={this.state.countries}
                        placeholder="Country"
                        prepareData={this.prepareCountryData}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="City">
                    {getFieldDecorator('city')(
                      <CustomSelect
                        onSelect={this.onSelectCityHandler}
                        data={this.state.cities}
                        placeholder="City"
                        prepareData={this.prepareCityData}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row className="profile-settings__submit">
                <Button type="primary" htmlType="submit" className="form__button">
                  Send
                </Button> 
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(ProfileSettings);

import React, { Component } from 'react';

import './ProfileSettings.css';

import {
  Form, Input, List, DatePicker, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';

const Option = AutoComplete.Option;

const listData = [
  {
    title: 'Wishes',
    action: ['23']
  },
  {
    title: 'Assigned',
    action: ['12']
  },
  {
    title: 'Not assigned',
    action: ['11']
  },
]

class CustomSelect extends React.Component {
  /* prepareData = () => {
    console.log(this.props.placeholder, this.props.data);
    return this.props.data.map(item => {
      return (
        <Option key={item.country_code} value={item.country_code}>
          {item.country_name}
        </Option>
        )
      }
    )
  } */

  render() {
    return (
      <AutoComplete
        style={{ width: '100%' }}
        size="large"
        dataSource={this.props.prepareData()}
        placeholder={this.props.placeholder || 'Country'}
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
    return this.state.cities.map(item => {
      return (
        <Option key={item.id} value={item.label}>
          {item.label}
        </Option>
      )
    }
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
    if (this.state.countries.length === 0) {
      this.getCountries();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  onSelectHandler = (value, option) => {
    this.setState({citiesFetching: true})
    this.getCities(value)
      .then((data) => {
        this.setState({
          selectedCountry: value,
          citiesFetching: false,
          cities: data
        })
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form;

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
              <Row>
                <div className="profile-settings__title">
                  <span>Виталий Андрюшков</span>
                  <Button icon="edit" />
                </div>
              </Row>
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
                        onSelect={this.onSelectHandler}
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
                        onSelect={this.onSelectHandler}
                        data={this.state.cities}
                        placeholder="City"
                        prepareData={this.prepareCityData}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(ProfileSettings);

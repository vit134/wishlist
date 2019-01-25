import React from 'react'

import { Card, Tabs } from 'antd';

import LoginFromCreated from './LoginForm';
import RegistrationFromCreated from './RefistrationForm';

const { TabPane } = Tabs;

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
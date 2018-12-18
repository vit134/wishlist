import React from 'react';

import './List.css';

import { Table, Checkbox } from 'antd';

import Tags from '../Tag/Tag';

const Column = Table.Column;

/* const ListItem = (props) => {
	return(
		<div className="list__item">
			<div className="list__col list__col_id">{props.i + 1}</div>
			<div className="list__col list__col_name"><a href={props.link}>{props.name}</a></div>
			<div className="list__col list__col_tags">
				{
					props.tags && props.tags.length > 0 &&
						<Tags tags={props.tags} />
				}
			</div>
			<div className="list__col list__col_assigned">{props.assigned ? props.assigned : 'not assigned'}</div>
		</div>
	);
}

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		render: (text, data) => {
			return <a href={data.link}>{text}</a>
		}
	},
	{
		title: 'Tags',
		dataIndex: 'tags',
		render: tags => {
			return <Tags tags={tags} />
		}
	},
	{
		title: 'Assigned',
		dataIndex: 'assigned',
		render: (assign, data) => {
			return (
				<Checkbox
					checked={assign !== ''}
					disabled={assign !== ''}
					onChange={(e) => console.log(data)}
				>
					{assign !== '' ? <>{assign}</> : 'assign to me'}
				</Checkbox>
			)
		}
	}
]; */

//export default (props) => {
export default class List extends React.Component {
	constructor(props) {
		super(props);
		this.onCheck = this.onCheck.bind(this);
	} 
	
	onCheck = (data) => {
		const { updateWish } = this.props.pageActions
		console.log(this.props, data)

		updateWish({ ...data, assigned: this.props.user.user_info._id})
	}

	render() {
		//console.log(this.props.page)
		return (
			<Table dataSource={this.props.page.data.body}>
				<Column
					title='Name'
					dataIndex='name'
					render={(text, data) => {
							return <a href={data.link}>{text}</a>
						}
					}
				/>
				<Column
					title='Tags'
					dataIndex='tags'
					render={tags => {
							return <Tags tags={tags} />
						}
					}
				/>
				<Column
					title='Assigned'
					dataIndex='assigned'
					render={(assign, data) => {
							return (
								<Checkbox
									checked={assign !== ''}
									disabled={assign !== ''}
									onChange={() => this.onCheck(data)}
								>
									{assign !== '' ? <>{assign}</> : 'assign to me'}
								</Checkbox>
							)
						}
					}
				/>	
			</Table>
		);
	}
}
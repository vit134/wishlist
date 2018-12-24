import React from 'react';

import './List.css';

import { Table, Checkbox, Button } from 'antd';

import Tags from '../Tag/Tag';

const Column = Table.Column;

export default class List extends React.Component {
	constructor(props) {
		super(props);
		this.onCheck = this.onCheck.bind(this);
		this.onRemove = this.onRemove.bind(this);
		this.onAssign = this.onCheck.bind(this);

		this.state = {
			selectedRowKeys: [],
			selectedRows: []
		};
	} 

	onSelectChange = (selectedRowKeys, selectedRows) => 
		this.setState({ selectedRowKeys, selectedRows })
	
	onCheck = (data) => {
		const { updateWish } = this.props.pageActions
		updateWish({ ...data, assigned: this.props.user.user_info._id})
	}

	onRemove() {
		this.props.pageActions.deleteWish(this.state.selectedRows.map(el => el._id))
			.then(() => {
				this.setState({
					selectedRowKeys: [],
					selectedRows: []
				})
			})
	}

	onAssign() {
		console.log('assign', this.state.selectedRows);
	}

	render() {
		const { selectedRowKeys, selectedRows } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};

		return (
			<>
				<Table
					rowSelection={rowSelection}
					dataSource={this.props.page.data.body}
					footer={
						() => {
							return (
								<div className="list__selection-actions">
									{
										selectedRows.length > 0 &&
											<>
												<Button 
													type="danger" 
													className="list__selection-actions-button"
													icon="delete"
													onClick={this.onRemove}
											>
												Remove
											</Button>
											<Button 
												type="primary" 
												className="list__selection-actions-button"
												icon="check-square"
											>
												Assign to me
											</Button>
											</>
									}
								</div>
							)
						}
					}
				>
					<Column
						title='Name'
						dataIndex='name'
						className="list__col_name"
						render={(text, data) => {
								return (
									<>
										<img src={`http://localhost:8888/${data.image.replace('./uploads/', '')}`} alt={text}/>
										<a href={data.link}>{text}</a>
									</>
								)
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
			</>
		);
	}
}
import React from 'react';

import './List.css';

import { Table, Checkbox, Button, Popconfirm } from 'antd';

import Tags from '../Tag/Tag';

import AddWishForm from '../Forms/addWishForm/index';

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
		const { deleteWish } = this.props.pageActions;
		deleteWish(this.state.selectedRows.map(el => el._id))
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
		const { toggleOverlay } = this.props.overlayActions;
		const { addWish } = this.props.pageActions
		console.log(this.props.page.data.body)
		return (
			<div className="list">
				<Table
					rowSelection={rowSelection}
					dataSource={this.props.page.data.body}
					rowKey={(bla, i) => i}
					pagination={{ hideOnSinglePage: true }}
					footer={
						() => {
							return (
								<div className="list__selection-actions">
									{
										selectedRows.length > 0 &&
											<>
												<Popconfirm title="Are you sure delete this wish?" onConfirm={this.onRemove} okText="Yes" cancelText="No">
													<Button 
														type="danger" 
														className="list__selection-actions-button"
														icon="delete"
													>
														Remove
													</Button>
												</Popconfirm>
												<Button 
													type="primary" 
													className="list__selection-actions-button"
													icon="check-square"
												>
													Assign to me
												</Button>
											</>
									}
									<Button
										type="primary"
										disabled={!this.props.user.isLogin || selectedRows.length > 0}
										onClick={() => toggleOverlay(<AddWishForm addWish={addWish} toggleOverlay={toggleOverlay} />)}
									>
										Add wish
									</Button>
								</div>
							)
						}
					}
				>
					<Column
						title='Name'
						dataIndex='name'
						render={(text, data) => {
								return (
									<div className="list__col_name">
										{data.image && <img src={`http://localhost:8888/${data.image.replace('./uploads/', '')}`} alt={text}/>}
										<a target="_blank" rel="noopener noreferrer" href={data.link}>{text}</a>
									</div>
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
						title='Category'
						dataIndex='category'
						render={category => {
							return <Tags tags={category} />
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
			</div>
		);
	}
}
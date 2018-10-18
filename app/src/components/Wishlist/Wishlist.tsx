// tslint:disable: no-console
import * as React from 'react';

import List from '../List/List';

// tslint:disable-next-line: no-empty-interface
interface IProps {}
interface IState {
	items: object[];
}

export default class WishList extends React.Component<IProps, IState> {
	constructor(props: object) {
		super(props);
		this.state = {
			items: []
		}
	}

	public componentWillMount() {
		fetch('http://localhost:8888/wishes', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'GET'
		})
		.then(res => {
			// console.log(res)
			return res.json()
		})
		.then(data => {
			console.log('data',data);
			this.setState({items: data});
		})
		.catch(e => {
			console.log(e);
		});
	}

	public render() {
		const { items } = this.state;

		return(
			<div className="wishlist">
				<div className="wishlist__list">
					<List items={items}/>
				</div>
			</div>
		);
	}
}
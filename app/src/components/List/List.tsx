// tslint:disable: no-console jsx-no-lambda
import * as React from 'react';
import Button from '../Button/Button';
import Form from '../Form/Form';

import './List.css';

interface IProps {
	items: object[];
}

export default (props: IProps) => {
	return (
		<div className="list">
			<div className="list__row list__row_header">
				<div className="list__col list__col_name">
					Название
				</div>
				<div className="list__col">
					Категория
				</div>
				<div className="list__col">
					Цена
				</div>
				<div className="list__col">
					Бронь
				</div>
			</div>
			{
				props.items.length > 0
				?
					props.items.map((el: IItemProps, i: number) => <ListItem key={i} {...el} />)
				:
					<div style={{textAlign: "center", fontSize: '30px', padding: '30px 0'}}>Ничего нет</div>
			}
		</div>
	)
}

interface IItemProps {
	_id: string;
	name: string;
	link: string;
	image: string;
	category: string;
	assigned: string;
	price: number;
}

interface IItemState {
	assigned: string;
	open: boolean;
}

interface ISubmitValue {
	assigned: string | undefined;
}

class ListItem extends React.Component<IItemProps, IItemState> {
	constructor(props: IItemProps) {
		super(props)
		this.state = {
			assigned: this.props.assigned,
			open: false
		}

		this.toggleControl = this.toggleControl.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	public render() {
		const { image, name, link, price, category } = this.props;
		if (this.state.open) {
			document.body.classList.add('noise');
		} else {
			document.body.classList.remove('noise');
		}

		return (
			<div className="list__row">
				<div className="list__col list__col_name">
					<img src={image} alt="" className="list__preview"/>
					<a href={link} target="_blank">{name}</a>
				</div>
				<div className="list__col">{category}</div>
				<div className="list__col">{price} руб.</div>
				<div className="list__col">
					{
						this.state.assigned
						?
							<span className="list__assigned">{this.state.assigned}</span>
						:
							<div>
							<Button
								onClick={this.toggleControl}
								cls="list__assignBtn"
								disabled={this.state.open}
							>
								Забронировать
							</Button>
							<div className={`list__assign-form ${this.state.open ? '' : 'hidden'}`}>
								<Form
									onSubmit={this.onSubmit}
									submitButton={true}
									cancelButton={true}
								>
									<input type="text" name="assigned" className={`list__assignInput`}/>
								</Form>
							</div>
							</div>
					}
				</div>
			</div>
		)
	}

	private toggleControl() {
		this.setState({open: !this.state.open});
	}

	private onSubmit(value: ISubmitValue) {
		console.log(value, this.props);

		this.assignWish(Object.assign({}, this.props, {assigned: value.assigned}))

	}

	private assignWish(props: IItemProps) {
		fetch(`http://localhost:8888/wishes/${props._id}`, {
			body: JSON.stringify(props),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'PUT',
		})
		.then(res => {
			// console.log('res', res)
			return res.json()
		})
		.then(data => {
			console.log('data', data);

			if (data.assigned) {
				console.log(data.assigned)
				this.toggleControl();
				this.setState({assigned: data.assigned})
			}
		})
		.catch(e => {
			console.log('e', e);
		});
	}
}
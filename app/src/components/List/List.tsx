// tslint:disable: no-console jsx-no-lambda
import * as React from 'react';
import Button from '../Button/Button';
import Form from '../Form/Form';

import './List.css';

interface IProps {
	items: object[];
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

interface IItemState {
	assigned: string;
	open: boolean;
}

class ListItem extends React.Component<IItemProps, IItemState> {
	private input: HTMLInputElement | null;

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
								{/* <input type="text" ref={input => this.input = input} className={`list__assignInput`}/>
								<div className="list__assign-form-buttons">
									<button onClick={() => this.onSubmit(this.props)} className="list__assignBtnSave" />
									<Button onClick={() => this.onSubmit(this.props)}>Сохоранить</Button>
								</div> */}
								<Form
									onSubmit={() => this.onSubmit(this.props)}
								>
									<input type="hidden" />
									<input type="text" ref={input => this.input = input} className={`list__assignInput`}/>
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

	private onSubmit(props: IItemProps) {
		this.assignWish(Object.assign({}, props, {assigned: this.input && this.input.value}))

	}

	private assignWish(props: IItemProps) {
		fetch(`http://localhost:8000/wishes/${props._id}`, {
			body: JSON.stringify(props),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'PUT',
		})
		.then(res => {
			console.log('res', res)
			return res.json()
		})
		.then(data => {
			console.log('data', data);

			if (data) {
				this.toggleControl();
				this.setState({assigned: data.assigned})
			}
		})
		.catch(e => {
			console.log('e', e);
		});
	}
}
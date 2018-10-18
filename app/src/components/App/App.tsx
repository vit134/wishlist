import * as React from 'react';
import './App.css';

import Header from '../Header/Header';
import Form from '../Form/Form';
import Overlay from '../Overlay/Overlay';

import { FieldInput } from '../Fields/Fields';

import WishList from '../Wishlist/Wishlist';

interface IState {
    modalOpen: boolean;
}

class App extends React.Component<object, IState> {
    constructor(props: object) {
        super(props);

        this.state = {
            modalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    public render() {
        return (
            <div className={`page ${this.state.modalOpen ? 'page_overflow' : ''}`}>
                <Header />
                <main className="page__content content">
                    <div className="content__inner">
                        <WishList />
                    </div>
                </main>
                <Overlay>
                    <Form title="Добавьте информацию о wish'ке" onSubmit={this.addWish} submitButtonText="Добавить">
                        <FieldInput name="name" label="Название" required={true}/>
                        <FieldInput name="link" label="Ссылка" />
                        <FieldInput name="image" label="Ссылка картинку" />
                        <FieldInput name="price" label="Цена" type="number" required={true} />
                    </Form>
                </Overlay>
            </div>
        );
    }

    private addWish(values?: object) {
        fetch(`http://localhost:8888/wishes`, {
			body: JSON.stringify(values),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
		})
		.then(res => {
			console.log('res', res)
			return res.json()
		})
		.then(data => {
            console.log('data', data);
            if (data) {
                window.location.reload();
            }
		})
		.catch(e => {
			console.log('e', e);
		});
    }

    private toggleModal() {
        this.setState({modalOpen: !this.state.modalOpen})
    }
}

export default App;

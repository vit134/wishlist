import React from 'react';

import './Filters.css';
import AddWishForm from '../Forms/addWishFrom';

export default class Filters extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="filters">
                <button className="btn" onClick={() => this.props.toggleOverlay(<AddWishForm addWish={this.props.addWish} />)}>
                    Добавить
                </button>
            </div>
        );
    }
}

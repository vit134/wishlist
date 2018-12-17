import React from 'react';

import './Filters.css';

import { Button } from 'antd';

import AddWishForm from '../Forms/addWishFrom';

export default class Filters extends React.Component {
    render() {
        const { toggleOverlay } = this.props.overlayActions;
        const { addWish } = this.props.pageActions

        return (
            <div className="filters">
                <Button
                    type="primary"
                    onClick={() => toggleOverlay(<AddWishForm addWish={addWish} />)}
                >
                    Добавить
                </Button>
            </div>
        );
    }
}

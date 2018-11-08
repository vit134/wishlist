import React, { Component } from 'react';

import Photos from '../Photos/Photos';
import Filters from '../Filters/Filters';

export default class Page extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.props.getWhishes();
    }

    renderPhotos() {
        if (this.props.data.body) {
            console.log(this.props.data.body);
            return this.props.data.body.map(el => {
                return(
                    <div>{el.name}</div>
                )
            });
        }
    }

    render() {
        console.log(this.props)
        const { isFetching } = this.props;
        return (
            <div className="ib page">
                {!isFetching ? (
                    this.renderPhotos()
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        );
    }
}

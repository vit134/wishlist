import React, { Component } from 'react';

import Photos from '../Photos/Photos';
import Filters from '../Filters/Filters';

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.props.getPhotos();
    }

    renderPhotos() {
        if (this.props.currentPhotos) {
            return <Photos photos={this.props.currentPhotos} />;
        }
    }

    render() {
        const { isFetching } = this.props;
        return (
            <div className="ib page">
                {!isFetching ? (
                    [<Filters {...this.props} />, this.renderPhotos()]
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        );
    }
}

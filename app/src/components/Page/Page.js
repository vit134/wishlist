import React, { Component } from 'react';

import List from '../List/List';
import Filters from '../Filters/Filters';

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.props.getWhishes();

        console.log(this.props);
    }

    render() {
        const { isFetching } = this.props;
        return (
            <div className="ib page">
                {!isFetching && this.props.data.body ? (
                    [<Filters toggleOverlay={this.props.toggleOverlay} addWish={this.props.addWish}/>,
                    <List data={this.props.data.body} />]
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        );
    }
}

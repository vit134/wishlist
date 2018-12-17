import React, { Component } from 'react';

import List from '../List/List';
import Filters from '../Filters/Filters';

export default class Page extends Component {
    render() {
        const { isFetching, page } = this.props;
        console.log(this.props);
        return (
            <div className="ib page">
                {!isFetching ? (
                    [<Filters toggleOverlay={this.props.toggleOverlay} addWish={this.props.addWish}/>,
                    <List data={page.data.body} />]
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        );
    }
}

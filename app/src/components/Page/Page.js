import React, { Component } from 'react';

import List from '../List/List';
import Filters from '../Filters/Filters';

export default class Page extends Component {
    render() {
        const { isFetching, page } = this.props;
        return (
            <div className="ib page">
                {!isFetching ? (
                    <>
                        <Filters { ...this.props }/>
                        <List data={page.data.body} />
                    </>
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        );
    }
}

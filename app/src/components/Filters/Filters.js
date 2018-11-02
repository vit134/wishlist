import React from 'react';

import './Filters.css';

export default class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.onSelected = this.onSelected.bind(this);
        this.swith = this.swith.bind(this);
    }

    onSelected(e) {
        console.log(e.target.value);
        this.props.getPhotosByYear(e.target.value);
    }

    swith() {
        this.props.sortByLikes();
    }

    render() {
        return (
            <div className="filters">
                <div className="filter__item">
                    <label htmlFor="year">Год</label>
                    <select id="year" onChange={this.onSelected}>
                        <option selected disabled>
                            Выберите год
                        </option>
                        {this.props.years.map((el, i) => {
                            return (
                                <option
                                    className="btn"
                                    onClick={this.onYearBtnClick}
                                    key={i}
                                    value={el}
                                >
                                    {el}
                                </option>
                            );
                        })}
                        <option value="all">Все</option>
                    </select>
                </div>
                <div className="filter__item">
                    <span onClick={this.swith} className="filter__switcher">
                        Лайки {this.props.sorting.likes ? '↓' : '↑'}
                    </span>
                </div>
            </div>
        );
    }
}

import * as React from 'react';

import './Photos.css';

const Photo = props => {
    const url = props.sizes[3] ? props.sizes[3].url : props.sizes[2].url;
    const likes = props.likes.count;
    const { text } = props;

    return (
        <div className="photo">
            <div className="photo__image-wrapper">
                <img src={url} alt={text} />
                <span className="photo__likes">{likes}</span>
            </div>
        </div>
    );
};

const Photos = ({ photos }) => {
    return (
        <div className="photos">
            <div className="photos__inner">
                {photos.map((el, i) => {
                    return <Photo key={i} {...el} />;
                })}
            </div>
        </div>
    );
};

export default Photos;

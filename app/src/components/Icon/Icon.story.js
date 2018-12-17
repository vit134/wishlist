import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number, text } from '@storybook/addon-knobs';

import Icon from './Icon';

const icons = {
    home: 'home',
    camera: 'camera',
    check: 'check',
    remove: 'remove',
    headphones: 'headphones'
}

storiesOf('Icon', module)
    .add('Simple', () => <Icon name={select('name', {home: 'home', camera: 'camera'}, 'remove')} />)
    .add('Full', () => {
        return (
            <Icon
                name={select('name', icons, 'home')}
                width={number('width', 25)}
                height={number('height', 25)}
                fillColor={text('fillColor', '#222')}
                strokeColor={text('strokeColor', '#222')}
            />
        )
    });
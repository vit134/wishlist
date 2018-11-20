import React from 'react';
import { configure, setAddon, addDecorator, Story } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import infoAddon, { withInfo } from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';

const Container = (props) => (
    <div className="storybook-container" style={{
		padding: '10px',
		border: '1px solid #eee',
        display: 'flex',
        flexDirection: 'column',
		alignItems: 'center',
		maxWidth: '700px',
		justifyContent: 'center',
		margin: '0 auto',
		background: '#dbdbdb'
    }}>
        {props.story()}
    </div>
);

//addDecorator((story, context) => withInfo('')(story)(context));
addDecorator(withKnobs);
addDecorator(story => <Container story={story} />);
//setAddon(infoAddon);

const req = require.context('../src/components', true, /\.story\.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
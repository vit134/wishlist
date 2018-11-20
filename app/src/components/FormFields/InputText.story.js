import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import InputText from './InputText';


storiesOf('InputText', module)
	.add('Simple', () => <InputText/>)
	.add('Full', () => <InputText
		placeholder={text('Placeholder', 'This is placeholder')}
		valid={{valid: false, message: 'asdasdad'}}
		clearButton={boolean('Clear button', true)}
	/>);
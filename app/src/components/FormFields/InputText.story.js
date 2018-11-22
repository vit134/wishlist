import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';

import InputText from './InputText';
import { IconBoltWhite } from '../Icon';


storiesOf('InputText', module)
	.add('Simple', () => <InputText/>)
	.add('Full', () => <InputText
		name={'inputText'}
		placeholder={text('Placeholder', 'This is placeholder')}
		valid={boolean('Is input validate', true)}
		validMessage={text('Validation message', 'Field do not be empty')}
		clearButton={boolean('Clear button', true)}
		icon={<IconBoltWhite />}
	/>);
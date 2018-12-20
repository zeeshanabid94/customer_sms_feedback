import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import CustomerForm from '../components/forms/CustomerForm';
import App from '../App';

storiesOf('Customer Form', module).add('Form looks like', () => <CustomerForm></CustomerForm>);
storiesOf('App', module).add("App looks like", () => <App></App>);


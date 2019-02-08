/* eslint-env browser */
import { createElement as h } from 'react';
import { hydrate } from 'react-dom';
import { createBrowserHistory } from 'history';

import App from '../components/App';

const initialState = window.INITIAL_STATE || {};
const history = createBrowserHistory();

const props = {
    history,
    initialState,
};

hydrate(h(App, props), document.getElementById('app'));

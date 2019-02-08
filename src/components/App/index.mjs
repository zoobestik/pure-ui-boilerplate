import { createElement as h } from 'react';

import './style.css';

import ErrorBoundary from '../ErrorBoundary';
import Application from '../Application';

export default props => h(ErrorBoundary, null, h(Application, props));

import { Component, createElement as h } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            error: null,
            info: null,
        };
    }

    get hasError() {
        return Boolean(this.state.error);
    }

    componentDidCatch(error, info) {
        this.setState({ error, info });
    }

    render() {
        if (!this.hasError) return this.props.children;

        const { error, info } = this.state;

        return h('div', null,
            h('p', null, JSON.stringify(error, null, 2)),
            h('p', null, JSON.stringify(info, null, 2)));
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.element.isRequired,
};

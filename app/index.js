/* eslint-disable import/no-dynamic-require,prefer-template,comma-dangle */
const babelRc = Object.assign({}, require('../.babelrc.json'), {
    cache: true,
    extensions: ['.es6', '.es', '.jsx', '.js', '.mjs'],
});

require('css-modules-require-hook')({
    generateScopedName: '[folder]__[local]-[hash:base64:6]',
});

require('@babel/register')(babelRc);
require('./app.mjs');

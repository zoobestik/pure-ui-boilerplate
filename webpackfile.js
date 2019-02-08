/* eslint-disable import/no-dynamic-require,prefer-template,comma-dangle */
const babelRc = Object.assign({}, require('./.babelrc.json'), {
    cache: true,
    extensions: ['.mjs']
});

require('@babel/register')(babelRc);

const lib = require('./scripts/webpack' + (process.env.NODE_ENV === 'production' ? '.prod' : '') + '.mjs');
module.exports = lib.default || lib;

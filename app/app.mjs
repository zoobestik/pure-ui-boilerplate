/* eslint-env node */
import { createServer } from 'http';
import { createReadStream } from 'fs';
import { parse } from 'url';
import { basename } from 'path';
import { contentType } from 'mime-types';
import { createFactory } from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';

import htmlTemplate from './lib/tmpl';

import App from '../src/components/App';

const PORT = process.env.PORT || 3007;
const appFactory = createFactory(App);


createServer(async (req, res) => {
    try {
        const { httpVersion, url, method } = req;

        console.log(`${httpVersion} ${method} ${url}`);

        if (url.startsWith('/dist/')) {
            const resourceType = contentType(basename(parse(url).pathname));
            if (resourceType) res.setHeader('Content-Type', resourceType);
            createReadStream(`.${url}`).pipe(res);
            return;
        }

        if (url === '/favicon.ico') {
            res.statusCode = 404;
            res.end('');
            return;
        }

        const history = createMemoryHistory();
        const html = renderToString(appFactory({ history }));
        res.end(htmlTemplate(html));
    } catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.end('500 Internal Error');
    }
})
    .listen(PORT, () => console.log(`Listening on ${PORT}...`));

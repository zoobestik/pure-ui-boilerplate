const safeStringify = (...args) => JSON.stringify(...args)
    .replace(/<\/(script)/ig, '<\\/$1')
    .replace(/<!--/g, '<\\!--')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

export default (html, title, opts) => `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="" rel="icon" type="image/x-icon">
        <title>${title}</title>
        <link rel="stylesheet" href="/dist/main.css">
    </head>
    <body>
    <div id="app">${html}</div>
    <script>window.INITIAL_STATE = ${safeStringify(opts || {})}</script>
    <script src="/dist/main.js"></script>
    </body>
</html>`;

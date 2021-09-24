import {createProxyMiddleware, RequestHandler} from 'http-proxy-middleware';
module.exports = function (app: { use: (arg0: RequestHandler) => void; }) {
    app.use(createProxyMiddleware('/api', {
        target: 'http://127.0.0.1:8081/',
        "changeOrigin": true,
        ws: true
    }));
};
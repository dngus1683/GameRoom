const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://221.149.235.184:8000',
      changeOrigin: true,
    })
  );
};
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://videohub-backend-b4hb.vercel.app',
      changeOrigin: true,
    })
  );
};
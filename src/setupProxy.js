const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    let options = {
        target: 'https://api.darksky.net',
        changeOrigin: true,
        ws: true,
    }
    let apiProxy = proxy(options);
    app.use('/forecast', apiProxy);
}
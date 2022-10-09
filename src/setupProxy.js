const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api/**", {
            target: "http://47.97.215.61:8081",
            changeOrigin: true,
            pathRewrite: {
                "^/api": "",
            },
        })
    );
};

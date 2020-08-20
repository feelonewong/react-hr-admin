
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
    app.use(createProxyMiddleware("/devApi",{
        /*配置请求的服务器地址*/
        target:"http://www.web-jshtml.cn/api/react",
        changeOrigin:true,
        pathRewrite:{
            "^/devApi":""
        }
    }))
}
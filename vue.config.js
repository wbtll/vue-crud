//

module.exports = {
    lintOnSave: false,
    publicPath: process.env.VUE_APP_PATH,
    // publicPath : process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: 'dist',
    devServer: {
        disableHostCheck: true,
        // overlay: { // 让浏览器 overlay 同时显示警告和错误
        //   warnings: true,
        //   errors: true
        // },
        https: false, // https:{type:Boolean}
        open: false, //配置后自动启动浏览器
        hotOnly: true, // 热更新
        proxy: { //配置多个代理
            "/api": {
                target: "",
                changeOrigin: true,
                ws: true, //websocket支持
                secure: false,
            },
        }
    }
}
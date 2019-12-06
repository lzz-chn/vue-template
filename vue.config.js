module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
    // assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
    // runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    configureWebpack: {
        devtool: 'source-map'
    },
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    pluginOptions: {},
    devServer: {
        // disableHostCheck: true, // 允许内网穿透
        // proxy: {
        //     '/api': {
        //         target: 'https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets', // 目标代理接口地址
        //         secure: false,
        //         changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端支持跨域
        //         pathRewrite: {
        //             '^/api': '/'  // 重写接口路径，使用 '/' 代替 '/api'
        //         }
        //     }
        // }
    }
};
module.exports = {
    publicPath: './', // 使用相对路径打包
    assetsDir: 'static', // 静态资源目录名称
    outputDir:"dist", // 打包资源导出文件路径
    configureWebpack: {
        devtool: 'source-map'
    },
    productionSourceMap: false,  // 生产环境是否生成 sourceMap 文件
    pluginOptions: {},
    devServer: {
        disableHostCheck: true  // 允许内网穿透
    }
}
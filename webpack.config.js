var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // 配置入口
    entry: {
        '/js/index': __dirname + '/origin/origin.js',
        '/css/index': __dirname + '/origin/css.js'
    },
    // 编译后的文件路径
    output: {

        path: __dirname + '/app', // 文件路径
        filename: '[name].js' // 文件名称
    },
    mode: 'development',
    module: {
        // 编译规则
        rules: [{
            test: /\.scss$/,
            use: ExtractPlugin.extract({
                use: ['css-loader', 'sass-loader'],
                fallback: 'style-loader'
            }, {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    'preset': ['es2015', 'stage-0'],
                    'plugins': ['transform-runtime']
                }
            })
        }]
    },
    // 辅助的插件
    plugins: [
        new BrowserSyncPlugin({
            // 实时监听，webpack -w 可以实时更新硬盘中的文件js,css
            host: 'localhost',
            port: '8080',
            file: '',
            server: {
                // localhost地址对应的文件目录
                baseDir: './app'
            }
        }),
        new ExtractPlugin('[name].css')
    ],
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    }
}
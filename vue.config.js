const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require("webpack");
const path = require("path");
const isProduction = process.env.NODE_ENV === 'production' // 是否生产环境


let externals = {
    'vue': 'Vue',
    'element-ui': 'ELEMENT',
    'vue-router': 'VueRouter',
    'axios': 'axios'
}
let cdn = {
    css: [
        // element-ui css
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.6/theme-chalk/index.min.css',// 样式表
        // 富文本框插件样式
        'https://cdn.bootcdn.net/ajax/libs/quill/1.3.7/quill.bubble.css',
        // 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/default.min.css'
        'https://cdn.bootcdn.net/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'


    ],
    js: [
        //bootcdn start
        'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js',
        'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.6/index.min.js',
        //bootcdn end


        //bootcss start
        //'https://cdn.bootcss.com/vue/2.6.11/vue.min.js', // vuejs
        //'https://cdn.bootcss.com/vue-router/3.2.0/vue-router.min.js',
        //'https://cdn.bootcss.com/axios/0.21.1/axios.js',
        //'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.3/index.min.js', // elementUI
        //bootcss end

    ]
}

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: process.env.NODE_ENV === 'development',//格式检查
    // transpileDependencies: true,

    devServer: {
        port: 6656,
        proxy: {
            '/api': {
                target: 'http://localhost:8080', // 配置访问的服务器地址
                pathRewrite: {'^/api': ''},
                changeOrigin: true // 用于控制请求头中的 host 值, 默认是 ture
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
        //修复HMR
        config.resolve.symlinks(true);
        config.plugins.delete('prefetch');
        config.plugin('html').tap(args => {
            args[0].cdn = cdn
            return args
        })
        config.optimization.delete('splitChunks')

        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    },
    configureWebpack: config => {
        const plugins = [];
        // 用于根据模块的相对路径生成 hash 作为模块 id, 一般用于生产环境
        // plugins.push(new WebpackBar())
        if (isProduction) {
            plugins.push(new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }))
            plugins.push(new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false, // 去掉注释
                    },
                    warnings: false,
                    compress: {
                        drop_console: true,
                        drop_debugger: false,
                        pure_funcs: ['console.log']//移除console
                    }
                }
            }));
        }
        config.plugins = [...config.plugins, ...plugins];
        config.externals = externals;
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                path.resolve(__dirname, 'src/styles/variables.scss'),
            ]
        }
    },
    productionSourceMap: false
}

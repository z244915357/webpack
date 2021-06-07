// 当前的postcss-loader 版本不支持直接在webpack.config.js 文件中写入
// 需要在根目录新建一个postcss.config.js文件，写入配置进行输出即可
module.exports = {
    plugins:[
        require('postcss-preset-env')()
    ]
}
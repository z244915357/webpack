// es6 核心
const { resolve } = require('path')
// 插件需要引入 plugins
const htmlWebpackplugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
process.env.NODE_ENV = 'development'
module.exports = {
    // 使用webpack-cli 4.0版本 webpack-dev-server启动服务时 entry 默认会找寻src目录下的index.js文件
    // 不必使用指定绝对路劲  ./src/index.js   使用 entry: './src'即可
    // 当不使用webpack-dev-server时 ，使用手动打包指令 开发打包 npm run dev  packjson文件有注释  需要制定入口文件 entry : './src/index.js'
    entry: ['./src/index.js', './src/index.html'],
    output: {
        filename: 'js/main.js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                // 一下loader只会匹配一个
                oneOf: [
                   
                    // css-loader 将css 转译插入到commonjs中  
                    // style-loader 将commonjs 中的css转译后的js解读 创建style标签 嵌入到header中渲染样式 
                    {

                        test: /\.css$/,
                        use: [
                            // miniCssExtractPlugin 将分散的css文件打包到一起
                            miniCssExtractPlugin.loader,
                            'css-loader',
                            'postcss-loader',
                        ]
                    },
                    // less-loader 处理less 类型的文件
                    {
                        test: /\.less$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            'less-loader'
                        ]
                    },
                    {
                        test: /\.(jpg|jpeg)$/,
                        //需要下载url-loader file-loader 
                        loader: 'url-loader',
                        options: {
                            // 图片小于64 将使用base64处理
                            limit: 8 * 1024,
                            //hash:10 按10个字符 ext 按默认文件类型 命名
                            name: '[hash:10].[ext]',
                            outputPath: 'imgs'
                        },
                    },
                    // url-loader 不能处理html文件中的img引入文件 所有需要使用html-loader 进行处理引入文件
                    {
                        test: /\.html$/,
                        // html-loader 负责处理html 文件中img 引入的文件
                        loader: 'html-loader',
                        // html-loader 使用commonjs解析  url-loader 使用es6模块编译解析 关闭（esModele:false）模块编译，图片就能正常展示
                        options: {
                            esModule: false
                        }
                    },
                    // 打包其他资源  js/css/html/json/less以外的资源（如js/css等资源前面已经配置了处理的loader这里将这些资源全部排除掉即可，这里使用过排除法，排除那些已经做过处理的文件类型，剩下的类型交友file-loader处理）
                    {
                        // exclude 排除制定文件之外的资源
                        exclude: /\.(js|css|html|less|json|jpg|jpeg|ttf)$/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'media'
                        }
                    },
                    {
                        // ttf 处理
                        test: /\.ttf$/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'ttf'
                        }
                    },
                   
                ]
            }
        ]
    },
    // 插件  引用插件需要1.下载 2.引入 3.使用
    plugins: [

        // 创建一个空html 加载资源 并将页面嵌入到展示html中
        new htmlWebpackplugin({
            // 生成的目标html
            template: './src/index.html'
        }),
        // miniCssExtractPlugin 使用时不支持之体图标处理  使用指定打包路劲时字体图标文件打包后引入失效，建议使用默认打包路劲
        // 没有之体图标类型文件时  可使用 filename:'**/**.css'  new miniCssExtractPlugin({  filename:'**/**.css'   })
        new miniCssExtractPlugin(
            // {
            //     filename:'css/built.css'
            // }
        ),
        new optimizeCssAssetsWebpackPlugin()
    ],
    // 编译模块
    mode: process.env.NODE_ENV,

    // 开发服务器 devServe ：用来自动化（自动化编译，自动化打开浏览器，自动化浏览器刷新）
    // 特点: 只会在内存中编译，不会进行输出
    // 启动devServe的指令位npx webpack-dev-server

    devServer: {
        // 启动服务的目录（开发环境编译后的文件）
        contentBase: resolve(__dirname, 'dist'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 8080,
        // open 当页面发生改变时 控制自动化更新 或者 打开新窗口 （热更新）
        open: true,
        hot: true //热更新  只更新被修改的文件其他文件不做编译 开发环境可以提高编译速度
    },
    devtool: 'eval-source-map'
    /**
     * source-map : 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射关系可追踪到源代码的错误）
     * [inline- |  hidden-  | eval-  ] source-map  
     * 
     * source-map :外部
     * [ 能准确提示到源代码出错的位置，并支持点击切换到源代码文件]
     * 
     * inline-source-map ： 内联
     * [ 能准确提示到源代码出错的位置，并支持点击切换到源代码文件]
     * 
     * 内联是在js 文件内部生成，没有外部文件，内联更快 ，外部生产是生产单独的**.map.js文件
     * 
     * hidden-source-map ： 外部
     * [ 能够提示到错误代码错误原因，单没有错误位置，不能追踪到源代码的位置，只能提示到构建后代码的错误位置]
     * 
     * 
     * 
     * eval-source-map ： 内联
     * [ 能准确提示到源代码出错的位置，并支持点击切换到源代码文件,提示后面多了一个hash值 ]
     * 
     * 每一个js文件都会生产一个内联，并且都在eval函数种eval(内联文件) 
     * 
     * 
     * nosources-source-map： 外部
     * [ 错误信息准确提示，找不到源代码，隐藏了源代码的信息 ]
     * 
     * cheap -source-map：外部
     * [ 能找到源代码，错误信息只能精确到行，具体是那一列，给出错误位置不够精确]
     * 
     * 
     * 开发环境： 速度块，调试更加优化
     * 开发环境 eval > inline > cheap 等其他
     *         eval-cheap-source-map 组合使用
     *         eval-source-map 
     * 调试友好
     * source-map
     * cheap-module-source-map 
     * cheap-source-map
     * 
     * 
     * 生产环境： 源代码要不要隐藏？调试要不要优化
     * 内联会让代码体积会非常大，所有不适用内联
     * 考虑调试使用
     * source-map/cheap-module-source-map
     * 
     * 需要隐藏代码使用
     * nosources-source-map 全部隐藏
     * hidden-source-map  只隐藏源代码 会提示构建后代码
     * 
     */
}
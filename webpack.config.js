const htmlWebpack = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimazer = requiere("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");
// siempre que nos piden estos require terminan por configurarse en plugins 
module.exports = {
    mode: 'development',

    output: {
        clean: true
    },

    module: {
        rules: [{
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/, /// la reglas en al cumplirse una deja de ejecutarse las otras por eso excluimos para que siga con la siguiente
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: ['file-loader']
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimazer(),
            new Terser()
        ]
    },

    plugins: [
        new htmlWebpack({
            title: 'Mi webpack app',
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]

}
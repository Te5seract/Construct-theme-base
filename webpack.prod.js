const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode : "production",
    entry : {
        "simple" : "./src/simple.js",
        "complex" : "./src/complex.js"
    },
    output : {
        filename : "[name].js",
        path : path.resolve(__dirname, "dist"),
        clean : true
    },
    plugins : [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename : "[name].css"
        })
    ],
    optimization : {
        minimizer : [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                terserOptions : {
                    ecma : "2021",
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        ],
        minimize : true
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    }
});
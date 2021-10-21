const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry : "./src/index.js",
    plugins : [
        // new HtmlWebpackPlugin({
        //     template : "./index.html"
        // })
    ],
    // module : {
    //     rules : [
    //         {
    //             test : /\.css$/,
    //             use : ["style-loader", "css-loader"]
    //         }
    //     ]
    // }
}
const HTMLWebpackPlugin = require("html-webpack-plugin")
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + "/src/index.html",
    filename: "index.html",
    inject: "body"
})

module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname + "/dist",
        publicPath: '/app',
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [HTMLWebpackPluginConfig]
}

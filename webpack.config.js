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
                // test: /\.css$/,
                // loaders: ['style-loader', 'css-loader']
            // }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            }
        ]
    },
    plugins: [HTMLWebpackPluginConfig]
}

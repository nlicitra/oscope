const ABS_PATH = __dirname // eslint-disable-line no-undef

const CopyWebpackPlugin = require("copy-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: ABS_PATH + "/src/index.html",
    filename: "index.html",
    inject: "body"
})

module.exports = {
    entry: "./src/app.js",
    output: {
        path: ABS_PATH + "/dist",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: "babel-loader"
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ["style-loader", "css-loader", "postcss-loader"]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: "./audio/all_we_ever_needed.mp3", to: "./dist/audio/music.mp3"}
        ]),
        HTMLWebpackPluginConfig
    ]
}

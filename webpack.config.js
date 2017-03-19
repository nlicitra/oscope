module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname + "/dist",
        publicPath: '/dist/',
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    }
}

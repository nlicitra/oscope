module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname + "/dist",
        publicPath: '/dist/',
        filename: "bundle.js"
    },
    node: {
        fs: "empty"
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }, {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    }
}

const path = require("path");
const webpack = require("webpack");

module.exports = {
    resolve: {
        alias: {
            jquery: path.join(__dirname, "./src/mastodon.js/jquery.min")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    entry: {
        background_scripts: "./src/background_scripts/background-script.js",
        popup_scripts: "./src/popup_scripts/popup-script.js",
        content_scripts: "./src/content_scripts/content-script.js"
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: [
                'babel-loader',
            ],
            exclude: /node_modules/,
            query: {
                presets: [
                    'es2015',
                ],
            },
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, ],
    },
    output: {
        path: "addon",
        filename: "[name]/index.js"
    }
};
 var webpack = require('webpack');
 var ExtractTextPlugin = require("extract-text-webpack-plugin");
 var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'});

module.exports = {
    entry: {
        // index1: './src/js/entry.js',
        // index2: './src/js/entry2.js'
    },
    output: {
        filename: '[name].js',
        // path: __dirname + '/out',
        // mode: 'development'
        // publicPath: 'http://localhost:8080/out',
        //  publicPath: './out',

        

    },
    module: {
        rules: [
            { test: /.js$/, use: ['babel-loader'] },
            // { test: /.css$/, use: ['style-loader', 'css-loader'] },
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: "css-loader"
            //     })
            // },
            { test: /.jpg|png|gif|svg/, use: ['url-loader?limit=8192&name=/[name].[ext]'] },
            {test:/.less$/, use:['style-loader','css-loader','less-loader']}
        ]
    },
    plugins: [
        //  new UglifyJSPlugin(),
        // new webpack.optimize.CommonsChunkPlugin ({
        //     name: "commons",
        //     filename: "commons.js",
        //     minChunks: 3
        // }),
         new ExtractTextPlugin('[name].css'),
         providePlugin
    ]


}
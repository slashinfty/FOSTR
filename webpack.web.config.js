const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    {
        mode: 'development',
        entry: './src/react.tsx',
        target: 'web',
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/i,
                    use: ['ts-loader']
                },
                {
                    test: /\.css$/i,
                    use: ['css-loader'],
                },
                {
                    test: /\.ttf$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.svg$/i,
                    type: 'asset/inline'
                }
            ]
        },
        output: {
            path: __dirname + '/build',
            filename: 'react.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ],
        devServer: {
            static: './build',
            port: 9000
        }
    }
];

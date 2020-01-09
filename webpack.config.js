const path = require('path');

module.exports = {
    entry: './src/js/main.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js',
    },
    resolve: {
        alias: {
            '@data': path.resolve(__dirname, 'data'),
            '@utils': path.resolve(__dirname, 'src/js/utils'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/transform-runtime']],
                    },
                },
            },
        ],
    },
};

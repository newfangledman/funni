const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config().parsed;
    console.log(env);
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});
    console.log(envKeys);
    return {
        entry: './src/js/main.js',
        mode: 'development',
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
        plugins: [new webpack.DefinePlugin(envKeys)],
    };
};

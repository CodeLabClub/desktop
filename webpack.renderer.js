const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');

const libraryFilesFolder = path.resolve(__dirname, 'library-files');
if (!fs.existsSync(libraryFilesFolder)) {
    fs.mkdirSync(libraryFilesFolder);
}

module.exports = defaultConfig => {
    defaultConfig.module.rules = [];
    return merge.smart(defaultConfig, {
        devtool: '',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    include: [
                        path.resolve(__dirname, 'src', 'renderer'),
                        /node_modules[\\/]scratch-[^\\/]+[\\/]src/
                    ],
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            '@babel/plugin-proposal-optional-chaining',
                            '@babel/plugin-transform-modules-commonjs',
                            '@babel/plugin-proposal-object-rest-spread'
                        ]
                    }
                },
                {
                    test: /\.(svg|png|wav|gif|jpg|mp3|ttf|otf)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'static/assets/',
                        esModule: false
                    }
                },
                {
                    test: /\.css$/,
                    exclude: /\.min\.css$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: {
                                    localIdentName: '[name]_[local]_[hash:base64:5]',
                                    exportLocalsConvention: 'camelCase'
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        'postcss-import',
                                        'postcss-simple-vars'
                                    ]
                                }
                            }
                        }
                    ],
                },
                {
                    test: /\.min\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ],
        },
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: 'node_modules/scratch-blocks/media',
                    to: 'static/blocks-media'
                },
                {
                    from: libraryFilesFolder,
                    to: 'library-files'
                },
                // TODO: copy extension worker?
                {
                    from: path.resolve(__dirname, 'node_modules', 'scratch-gui', 'static'),
                    to: 'static'
                }
            ])
        ],
        resolve: {
            alias: {
                'scratch-gui$': path.resolve(__dirname, 'node_modules', 'scratch-gui', 'src', 'index.js'),
                'scratch-render-fonts$': path.resolve(__dirname, 'node_modules', 'scratch-gui', 'src', 'lib', 'tw-scratch-render-fonts'),
            }
        },
        output: {
            libraryTarget: 'var'
        },
        target: 'web'
    });
};

const babelOptions = {
    presets: ['babel-preset-gatsby-package'],
    plugins: ['@babel/plugin-transform-spread'],
};

module.exports = require('babel-jest').createTransformer(babelOptions);

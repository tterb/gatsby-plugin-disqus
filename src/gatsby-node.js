let didRunAlready = false;
let shortname = '';

exports.onPreInit = function(_ref, pluginOptions) {
    // Gatsby adds a pluginOptions that's not needed for this plugin
    delete pluginOptions.plugins;
    shortname = pluginOptions.shortname;

    if (didRunAlready) {
        throw new Error('You can only have single instance of gatsby-plugin-disqus in your gatsby-config.js');
    }
    didRunAlready = true;
};

exports.onCreateWebpackConfig = ({ plugins, actions }) => {
    const setWebpackConfig = actions.setWebpackConfig;
    setWebpackConfig({
        plugins: [plugins.define({
            GATSBY_DISQUS_SHORTNAME: JSON.stringify(shortname),
        })],
    });
};

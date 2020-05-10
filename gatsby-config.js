const manifestConfig = require(`./manifest-config`);
const tailwindConfig = require(`./tailwind.js`);
require(`dotenv`).config();

const { ANALYTICS_ID } = process.env;

const getAboutEntry = entry => entry.sys.contentType.sys.id === `about`;

module.exports = {
  siteMetadata: {
    title: `Gatsby Plugin Disqus`,
    description: `Improve audience engagement by integrating Disqus comments into your Gatsby website`,
    socialLinks: [
      {
        name: `Github`,
        url: `https://github.com/tterb/gatsby-plugin-disqus`,
        icon: `github`,
      },
      {
        name: `NPM`,
        url: `https://www.npmjs.com/package/gatsby-plugin-disqus`,
        icon: `npm`,
      },
      {
        name: `Twitter`,
        url: `https://twitter.com/bstevensondev`,
        icon: `twitter`,
      },
      {
        name: `Contact`,
        url: `https://brettstevenson.io/contact`,
        icon: `envelope`,
      },
    ],
    icon: `./src/images/icon.png`,
  },

  pathPrefix: '/gatsby-plugin-disqus',
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: manifestConfig,
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [require(`tailwindcss`)(`./tailwind.js`)],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-emojis`,
            options: {
              class: `emoji`,
              size: 32,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-emojis`,
            options: {
              class: `emoji`,
              size: 32,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 820,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`,
              rel: `nofollow noopener noreferrer`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {},
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production` ?
            [require(`cssnano`)] :
            []),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-postcss`, // Implements PostCSS
      options: {
        postCssPlugins: [
          require(`autoprefixer`),
          require(`postcss-import`), // Add support for sass-like `@import`
          require(`postcss-extend`), // Add support for sass-like `@extend`
          require(`postcss-nesting`), // Add support for sass-like nesting of rules
          require(`postcss-calc`),
          require(`postcss-discard-comments`),
          require(`cssnano`), // Minify CSS
          require(`postcss-reporter`),
          require(`postcss-pxtorem`)({
            mediaQuery: false, // Ignore media queries
            minPixelValue: 0, // Minimal pixel value that will be processed
            propList: [], // List of CSS properties that can be changed from px to rem; empty array means that all CSS properties can change from px to rem
            replace: true, // Replace pixels with rems
            rootValue: 16, // Root font-size
            selectorBlackList: [`html`], // Ignore pixels used for html
            unitPrecision: 4, // Round rem units to 4 digits
          }),
          require(`postcss-preset-env`)({
            stage: 3, // More info about stages: https://cssdb.org/#staging-process
          }),
          require(`tailwindcss`)(tailwindConfig),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        develop: true,
        printRejected: true,
        ignore: ['src/style/syntax.scss'],
        whitelist: [`pre`, `code`],
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        stripMetadata: true,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `tterb-gatsby`,
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-offline`,
  ],
};

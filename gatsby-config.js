const manifestConfig = require(`./manifest-config`);
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
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: manifestConfig,
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
      resolve: `gatsby-mdx`,
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

# Gatsby Plugin Disqus  

<p align="right">
  <a href="https://npmjs.org/package/gatsby-plugin-disqus"><img src="http://img.shields.io/npm/v/gatsby-plugin-disqus.svg" alt="npm version" /></a>
</p>

A plugin that simplifies the process of integrating [Disqus](https://disqus.com/) comments within your [Gatsby](https://www.gatsbyjs.org/) website.

## Install
`$ yarn add gatsby-plugin-disqus`  
or  
`$ npm install -S gatsby-plugin-disqus`  

## Configure

Add the plugin to your `gatsby-config.js` file with your [Disqus shortname](https://help.disqus.com/installation/whats-a-shortname)

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `your-disqus-shortname`
      }
    },
  ]
}
```

## Usage

The plugin can be used as shown in this brief example:

```js
import Disqus from 'gatsby-plugin-disqus'

const PostTemplate = () => (
  <>
    /* Page Contents */
    <Disqus 
      identifier={post.id}
      title={post.title}
      url={`${config.siteUrl}${location.pathname}`}
    />
  </>
)

export default PostTemplate
```

While providing an `identifier`, `title`, and `url` are optional, it is recommended as it will ensure that threads won't be lost in the case that the post is renamed or the domain changes.

## How to contribute

If you have unanswered questions, would like help with enhancing or debugging the plugin, feel free create an [issue](https://github.com/tterb/gatsby-plugin-disqus/issues/new) or submit a [pull request](https://github.com/tterb/gatsby-plugin-disqus/pulls)
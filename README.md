# Gatsby Plugin Disqus  

A plugin that simplifies the process of integrating [Disqus](https://disqus.com/) comments within your [Gatsby](https://www.gatsbyjs.org/) website.

## Description  
The goal of this plugin is to allow users to bring their content to life and cultivate engaged communities by integrating Disqus comments into their blazing-fast Gatsby websites. As someone who has used Disqus many times in the past and struggled to use a few different Disqus React components in my Gatsby site, creating this plugin seemed like a no-brainer.  

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

## Contributing

  1. Make sure you have `yarn` installed.
  2. Create a new folder to be used as your yarn workspace. `mkdir gatsby-disqus-workspace`
  3. Inside your workspace folder, clone this repo.
  4. `cd` into `gatsby-disqus-workspace/gatsby-plugin-disqus/` and run `yarn && yarn watch`. *Leave this terminal window open.*
  5. In addition to this repo in your workspace folder, add a gatsby site that uses `gatsby-plugin-disqus` for testing purposes.
  6. In your workspace folder create a `package.json` and add the following:
```json
{
	"private": true,
	"workspaces": [
		"example-site", <-- name of your test site folder
		"gatsby-plugin-disqus/lib"
	]
}
```
  7. In a new terminal window, `cd` to your workspace folder and run `yarn && yarn workspace <example-site> run develop`.

If you have unanswered questions, would like help with enhancing or debugging the plugin, feel free create an [issue](https://github.com/tterb/gatsby-plugin-disqus/issues/new) or submit a [pull request](https://github.com/tterb/gatsby-plugin-disqus/pulls)

const _ = require('lodash')

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise => promise.then(result => {
  if (result.errors) {
    throw result.errors
  }
  return result
})

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let slug
  // Only use MDX nodes
  if (node.internal.type === 'Mdx') {
    const fileNode = getNode(node.parent)
    // If the frontmatter contains a "slug", use it
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    )
      slug = `/${_.kebabCase(node.frontmatter.slug)}`

    // Otherwise use the title for the slug
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    )
      slug = `/${_.kebabCase(node.frontmatter.title)}`

    createNodeField({ node, name: 'slug', value: slug })
    // Adds the name of "gatsby-source-filesystem" as field (in this case "projects" or "pages")
    createNodeField({ node, name: 'sourceInstanceName', value: fileNode.sourceInstanceName })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // page templates
  const postTemplate = require.resolve('./src/templates/post.jsx')

  const result = await wrapper(
    graphql(`
      {
        posts: allMdx(filter: { fields: { sourceInstanceName: { eq: "Posts" } } } sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `),
  )

  result.data.posts.edges.forEach(post => {
    createPage({
      path: post.node.fields.slug,
      component: postTemplate,
      context: {
        // Pass "slug" through context so we can reference it in our query like "$slug: String!"
        slug: post.node.fields.slug,
      },
    })
  })
}
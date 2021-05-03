const { createFilePath } = require(`gatsby-source-filesystem`)

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createRedirect } = actions
  const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.tsx`)

  const result = await graphql(`
    {
      allMdx(sort: { order: ASC, fields: [frontmatter___order] }, limit: 1000) {
        edges {
          node {
            frontmatter {
              slug
              order
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)

    return
  }

  createRedirect({
    fromPath: '/',
    toPath: '/modules/component/atom/',
    redirectInBrowser: true,
    isPermanent: true,
  })

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
        // order: node.frontmatter.order,
        // Pass edges data to each page, so we can create the menu
        edges: result.data.allMdx.edges,
      },
    })
  })
}

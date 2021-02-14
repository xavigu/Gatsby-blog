/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  // obtain the createNodeField from the actions
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    // slug is the navigation path(url) that the browser use to navigate to the page required
    // getNode is using to get the node object from a file
    const slug = createFilePath({ 
      node, 
      getNode
    });
    console.log('sluuuug:', slug);
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
  // console.log(node.internal.type)
}
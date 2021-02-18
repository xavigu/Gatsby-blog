/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  // obtain the createNodeField from the actions
  const { createNodeField } = actions;
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
      value: slug
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  // graphql methos returns a promise
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result) => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: node.fields.slug
        }
      });
    });
  });
};

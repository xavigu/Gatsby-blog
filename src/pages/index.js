import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  console.log(data);

 return (
  <Layout>
    <SEO title="Home" />
    <div>
      <h1>Xavigu´s Posts</h1>
      {
        data.allMarkdownRemark.edges.map(({node}) => (
          <div key={node.id}>
            <Link style={{ textDecoration: `none` }} to={`${node.fields.slug}`} >
              <span>{ node.frontmatter.title } - { node.frontmatter.date }</span>
            </Link>
            <p>{node.excerpt}</p>
          </div>
        ))
      }
    </div>
  </Layout>
 )
}

export const query = graphql`
  query{
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            date
            description
            title
          }
          excerpt
          fields{
            slug
          }
        }
      }
    }
  }
`
import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogLink = styled(Link)`
  text-decoration: none;
  `;
  
const BlogTitle = styled.h3`
  font-size: 28px;
  margin-bottom: 20px;
  color: #0000ff8c;
`;

const MainTitle = styled.h1`
  margin-bottom: 0.45rem;
  color: #0a0a0ac7;
`;

const BlogDescription = styled.p`
  color: #000000;
`;

export default ({ data }) => {
  console.log(data);

  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <MainTitle>Posts</MainTitle>
        <hr></hr>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <BlogLink to={node.fields.slug}>
            <div key={node.id} className="post-card">
              <BlogTitle>
                {node.frontmatter.title} - {node.frontmatter.date}
              </BlogTitle>
              <BlogDescription>{node.excerpt}</BlogDescription>
            </div>
          </BlogLink>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
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
          fields {
            slug
          }
        }
      }
    }
  }
`;

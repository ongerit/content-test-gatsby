import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import config from '../utils/siteConfig'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import '../sass/pages/index.scss'

const Index = ({data}) =>  {

  const posts = data.allContentfulPost.edges;

  return (
    <Container>
      <PageTitle small>
        <a href="//www.thomasongeri.com">ADMIN PAGE</a>
      </PageTitle>
      <CardList>
        {posts.map(({ node: post })=> (
          <Card
           key={post.id}
           assetId={post.id}
           slug={post.slug}
           image={post.heroImage}
           title={post.title}
           artist={post.aritistName}
           date={post.publishDate}
           excerpt={post.body}
          />
        ))}
      </CardList>
    </Container>
  )
}

export const query = graphql`
  query indexQuery {
    allContentfulPost(
      limit: 1000, 
      sort: {
        fields: [publishDate], 
        order: DESC
      },
      filter: {node_locale: {eq: "en-US"}}
    ) {
      edges {
        node {
          title
          artistName
          id
          slug
          publishDate(formatString: "MMMM DD, YYYY")
          heroImage {
            title
            sizes(maxWidth: 800) {
              ...GatsbyContentfulSizes_withWebp_noBase64
            }
          }
          body {
            childMarkdownRemark {
              html
              excerpt(pruneLength: 80)
            }
          }
        }
      }
    }
  }
`

export default Index

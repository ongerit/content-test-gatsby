import React from 'react'
import find from 'lodash/find'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import config from '../utils/siteConfig'
import Hero from '../components/Hero'
import Container from '../components/Container'
import PageBody from '../components/PageBody'
import TagList from '../components/TagList'
import PostLinks from '../components/PostLinks'
import '../sass/template/post.scss'

const PostTemplate = ({data}) => {

  const {
    title,
    artistName,
    slug,
    id,
    heroImage,
    description,
    body,
    tags,
  } = data.contentfulPost;

  const postIndex = find(
    data.allContentfulPost.edges,
    ({ node: post }) => post.id === id
  );

  return(
    <div>

      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
        <meta property="og:title" content={`${title} - ${config.siteTitle}`} />
        <meta property="og:url" content={`${config.siteUrl}/${slug}/`} />
        <meta property="og:image" content={heroImage.sizes.src} />
      </Helmet>

      <Hero
        title={title}
        image={heroImage}
        height={'37vh'}
        artist={artistName}
      />
      <Container>
        {tags && (<TagList tags={tags} />)}
        <PageBody body={body} />
        <PostLinks previous={postIndex.previous} next={postIndex.next} />
      </Container>

    </div>
  )
}

export const query = graphql`
  query postQuery($slug: String!) {
    contentfulPost(slug: {eq: $slug}) {
      title
      artistName
      id
      slug
      publishDate(formatString: "MMMM DD, YYYY")
      tags {
        title
        id
        slug
      }
      heroImage {
        title
        sizes(maxWidth: 1800) {
          ...GatsbyContentfulSizes_withWebp_noBase64
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulPost(limit: 1000, sort: { fields: [publishDate], order: DESC })  {
      edges {
        node {
          id
        }
        previous {
          slug
        }
        next {
          slug
        }
      }
    }
  }
`

export default PostTemplate

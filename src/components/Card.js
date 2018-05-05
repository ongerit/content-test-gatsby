import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import '../sass/components/card.scss'

const Post = styled.li`
  margin: 0 0 1em 0;
  width: 100%;
  transition: background .2s;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    flex: 0 0 49%;
    margin: 0 0 2vw 0;
  }
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    flex: 0 0 32%;
  }
  &:hover {
    background: ${props => props.theme.colors.tertiary};
  }
  a {
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 100%;
    color: ${props => props.theme.colors.base};
    text-decoration: none;
    .gatsby-image-wrapper {
      height: 0;
      padding-bottom: 60%;
    }
  }
`;

const Card = (props) => {
  return (
    <Post>
      <div className="card">
        <Link to={`/${props.slug}/`}>
            <Img 
            sizes={props.image.sizes} 
            className="card__image"
            />
          <div className="card__content">
            <div className="card__title">{props.title}</div>
            <div className="card__date">{props.date}</div>
            <div className="card__excerpt" 
                dangerouslySetInnerHTML={{ __html: props.excerpt.childMarkdownRemark.excerpt }}>
            </div>
          </div>
        </Link>
      </div>
    </Post>
  )
}

export default Card

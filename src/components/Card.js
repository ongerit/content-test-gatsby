import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import {createClient} from 'contentful-management'
import '../sass/components/card.scss'

const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const SPACE_ID = process.env.SPACE_ID

const client = createClient({
  accessToken: ACCESS_TOKEN
})

const publishContent = (e, asset_id) => {
  e.preventDefault()
  const publishPost = (asset_id)=> {
    client.getSpace(SPACE_ID)
    .then((space) => space.getAsset(asset_id))
    .then((asset) => asset.publish())
    .then((asset) => console.log(`Asset ${asset.sys.id} published.`))
    .catch(console.error)
  }
}

const unPublishContent = (e, asset_id) => {
  e.preventDefault()

  client.getSpace(SPACE_ID)
  .then((space) => space.getAsset(asset_id))
  .then((asset) => asset.unpublish())
  .then((asset) => console.log(`Asset ${asset.sys.id} unpublished.`))
  .catch(console.error)
}



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
              <div className="card__wrapper">
                <Link to={`/${props.slug}/`}>
                    <Img 
                    sizes={props.image.sizes} 
                    className="card__image"
                    />
                  <div className="card__content">
                    <div className="card__title">{props.title}</div>
                    <div className="card__name">{props.artistName}</div>
                    <div className="card__excerpt" 
                        dangerouslySetInnerHTML={{ __html: props.excerpt.childMarkdownRemark.excerpt }}>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="card__control">
              <div className="card__publish" onClick={(e) => publishContent(e, `${props.assetId}`)}>Publish</div>
              <div className="card__draft" onClick={(e) => unPublishContent(e, `${props.assetId}`)}>Draft</div>
            </div>
        </div>
      </Post>
  )
}

export default Card

import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import '../sass/components/hero.scss'

const Wrapper = styled.section`
  position: relative;
  min-height: 100px;
`
const BgImg = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  @media (min-width: ${props => props.theme.responsive.small}) {
    height: ${props => props.height || 'auto'};
  }
  & > img {
    object-fit: ${props => props.fit || 'cover'} !important;
    object-position: ${props => props.position || '50% 50%'} !important;
  }
  &:before {
    content: '';
    background: rgba(0,0,0,.25);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;
  }
`

const Title = styled.h1`
  font-size: 2em;
  text-transform: capitalize;
  font-weight: 600;
  position: absolute;
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
  padding: 0 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
`

const Hero = (props) => (
  <Wrapper>
    <div className="hero">
    <BgImg height={props.height} sizes={props.image.sizes}  />
    <h2>{props.artist}</h2>
    <Title>{props.title}</Title>
    </div>
  </Wrapper>
)

export default Hero

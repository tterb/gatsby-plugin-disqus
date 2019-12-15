import React, { Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Flex } from 'rebass'
import { SectionLink } from 'react-scroll-section'
import tw from 'tailwind.macro'
import styled from 'styled-components'
// Components
import Section from '../components/Section'
import SocialIcons from '../components/SocialIcons'
import MouseIcon from '../components/MouseIcon'
import { Title } from '../components/Titles'
import Comment from '../components/Logo/comments.svg'
// Styles
import '../style/main.scss'


const Wrapper = styled.div`
  ${tw`flex justify-start items-start flex-wrap w-auto ml-auto`}
`

const Contents = styled.div`
  ${tw`flex relative text-left justify-start items-start flex-wrap`}
  width: 55%;
  top: -2.5rem;
  margin-left: 5%;
`

const SubText = styled.p`
  ${tw`text-xl text-left pl-1`}
  color: rgba(255,255,255,0.75);
`

const Links = styled.div`
  ${tw`flex justify-start items-start flex-wrap`}
`

const ImgWrapper = styled.div`
  ${tw`flex relative justify-end items-end flex-wrap`}
  width: 35%;
  top: 0.75rem;
`

const Icon = styled.img`
  ${tw`relative w-9/10 justify-end items-end flex-wrap mt-0 mx-auto mr-0 opacity-75`}
`

const LandingPage = () => (
  <Section.Container id='home' background='radial-gradient(#663399, #442277)' className='full hero'>
    <StaticQuery
      query={heroQuery}
      render={data => {
        const { title, description } = data.site.siteMetadata
        return (
          <Fragment>
            <Wrapper>
              <Contents>
                <Title>{title}</Title>
                <Flex alignItems='start' justifyContent='start' flexWrap='wrap'>
                  <SubText>{description}</SubText>
                </Flex>
                <SocialIcons />
              </Contents>
              <ImgWrapper>
                <Icon src={Comment} alt='Comment' />
              </ImgWrapper>
            </Wrapper>
            <SectionLink section='motivation'>
              {({ onClick }) => <MouseIcon onClick={onClick} />}
            </SectionLink>
          </Fragment>
        )
      }}
    />
  </Section.Container>
)

const heroQuery = graphql`
  query HeroQuery {
    site {
      siteMetadata {
        title
        description
        socialLinks {
          name
          url
          icon
        }
      }
    }
  }
`

export default LandingPage

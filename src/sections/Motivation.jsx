import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import tw from 'tailwind.macro'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Section from '../components/Section'
import Wave from '../components/Wave'

const Wrapper = styled.div`
  ${tw`flex justify-start items-start flex-wrap`}
  z-index: 9;
`

const Contents = styled.div`
  ${tw`flex w-full md:w-3/5 justify-start items-start flex-wrap`}
`

const ImgWrapper = styled.div`
  ${tw`w-1/3 h-auto justify-end items-end flex-wrap mt-20 hidden md:flex mx-auto mr-0`};
`

const LogoImg = styled(Image)`
  ${tw`relative w-full mx-auto`}
  width: 29vw;
  height: 29vw;
  max-width: 320px;
  max-height: 320px;
  top: -5.25rem;
  border-radius: 50%;
  transition: all 0.25s ease-out;
  &:hover {
    border-radius: 20%;
  }
`

const Motivation = () => (
  <Section.Container id='motivation' className='first'>
    <StaticQuery
      query={motivationQuery}
      render={data => {
        const { title } = data.mdx.frontmatter
        const content = data.mdx.body
        const logo = data.logo.childImageSharp.fluid
        return (
          <>
            <Section.Header name={title} />
            <Wrapper>
              <Contents className='text-content'>
                <Fade bottom>
                  <MDXRenderer>{content}</MDXRenderer>
                </Fade>
              </Contents>
              <ImgWrapper>
                <Fade right>
                  <LogoImg fluid={logo} alt='logo' />
                </Fade>
              </ImgWrapper>
              <Wave />
            </Wrapper>
          </>
        )
      }}
    />
  </Section.Container>
)

const motivationQuery = graphql`
  query MotivationQuery {
    mdx(frontmatter: { title: { eq: "Motivation" } }) {
      frontmatter {
        title
      }
      body
    }
    logo: file(relativePath: {eq: "logo.png"}) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default Motivation

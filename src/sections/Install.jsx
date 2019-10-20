import React from 'react'
import { Box, Image, Flex } from 'rebass'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Section from '../components/Section'
import Wave from '../components/Wave'


const Install = () => (
  <Section.Container id='install' className='alt'>
    <StaticQuery
      query={installQuery}
      render={data => {
        const title = data.mdx.frontmatter.title;
        const content = data.mdx.code.body;
        return (
          <>
            <Section.Header name={title} />
            <Flex justifyContent='center' alignItems='center' flexWrap='wrap'>
              <Box width={[1, 1, 1]} px={[1, 2, 2]}>
                <Fade bottom>
                  <MDXRenderer className='text-content'>{content}</MDXRenderer>
                </Fade>
              </Box>
              <Wave position='bottom' />
            </Flex>
          </>
        )
      }}
    />
  </Section.Container>
)

const installQuery = graphql`
  query InstallQuery {
    mdx(frontmatter: { title: { eq: "Install" } }) {
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`

export default Install

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Box, Flex } from 'rebass'
import Fade from 'react-reveal/Fade'
import { MDXRenderer } from 'gatsby-plugin-mdx'
// Components
import Section from '../components/Section'
import Wave from '../components/Wave'


const Usage = () => (
  <Section.Container id='usage'>
    <StaticQuery
      query={usageQuery}
      render={data => {
        const { title } = data.mdx.frontmatter
        const content = data.mdx.body
        return (
          <>
            <Section.Header name={title} />
            <Flex justifyContent='center' alignItems='center' flexWrap='wrap' className='text-content'>
              <Box width={[1, 1, 1]} px={[1, 2, 2]}>
                <Fade bottom>
                  <MDXRenderer>{content}</MDXRenderer>
                </Fade>
              </Box>
              <Wave direction='left' />
            </Flex>
          </>
        )
      }}
    />
  </Section.Container>
)

const usageQuery = graphql`
  query UsageQuery {
    mdx(frontmatter: { title: { eq: "Usage" } }) {
      frontmatter {
        title
      }
      body
    }
  }
`

export default Usage

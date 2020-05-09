import React from 'react'
import { Box, Flex } from 'rebass'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Section from '../components/Section'

const Content = styled(Box)`
  .text-content {
    ol {
      margin-block-start: 0 !important;
    }
  }
`

const Contribute = () => (
  <Section.Container id='contribute'>
    <StaticQuery
      query={contributeQuery}
      render={data => {
        const { title } = data.mdx.frontmatter
        const content = data.mdx.body
        return (
          <>
            <Section.Header name={title} />
            <Flex justifyContent='center' alignItems='center' flexWrap='wrap'>
              <Content width={[1, 1, 1]} px={[1, 2, 2]} className='text-content'>
                <Fade bottom>
                  <MDXRenderer>{content}</MDXRenderer>
                </Fade>
              </Content>
            </Flex>
          </>
        )
      }}
    />
  </Section.Container>
)

const contributeQuery = graphql`
  query ContributeQuery {
    mdx(frontmatter: { title: { eq: "Contribute" } }) {
      frontmatter {
        title
      }
      body
    }
  }
`

export default Contribute

import React from 'react'
import { Box, Image, Flex } from 'rebass'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Section from '../components/Section'

const Content = styled(Box)`
  .text-content {
    ol li {
      margin: 0.5rem 0;
    }
  }
`

const Contribute = () => (
  <Section.Container id='contribute'>
    <StaticQuery
      query={contributeQuery}
      render={data => {
        const title = data.mdx.frontmatter.title
        const content = data.mdx.code.body
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
      code {
        body
      }
    }
  }
`

export default Contribute

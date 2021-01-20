import React from 'react'
import { Text, Flex, Box, Link } from 'rebass'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import tw from 'tailwind.macro'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import { MDXRenderer } from 'gatsby-plugin-mdx'
// Components
import Section from '../components/Section'
import Wave from '../components/Wave'


const Post = ({ data: { mdx: node }, location }, ...props) => {
    const frontmatter = node.frontmatter
    return (
        <Section.Container id='post' className='alt'>
            <Section.Header name={frontmatter.title} />
            <Wave position='bottom' />
            <div className='w-9/10 lg:w-4/5 mx-auto pb-12'>
                <MDXRenderer>{node.body}</MDXRenderer>
            </div>
        </Section.Container>
    )
}
Post.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteUrl: PropTypes.string.isRequired,
      })
    }).isRequired,
    mdx: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      fields {
        slug
      }
      parent {
        ... on File {
          mtime
          birthtime
        }
      }
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        desc
      }
    }
  }
`

export default Post

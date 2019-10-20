import React from 'react'
import { Image, Text, Flex, Box, Link } from 'rebass'
import { StaticQuery, graphql } from 'gatsby'
import tw from 'tailwind.macro'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import Section from '../components/Section'
import { CardContainer, Card } from '../components/Card'
import ImageSubtitle from '../components/ImageSubtitle'
import Wave from '../components/Wave'
// Icons
import { Github } from 'styled-icons/boxicons-logos/Github'
import { Globe } from 'styled-icons/boxicons-regular/Globe'

const CARD_HEIGHT = '200px'
const MEDIA_QUERY_SMALL = '@media (max-width: 400px)'

const TextContainer = styled.div`
  ${tw`flex flex-col text-base w-full p-3 pl-6 pr-0`}
  width: calc(100% - ${CARD_HEIGHT});
  ${MEDIA_QUERY_SMALL} {
    width: calc(100% - (${CARD_HEIGHT} / 2));
  }
`

const Title = styled(Text)`
  ${tw`table text-2xl font-semibold tracking-tight uppercase no-underline mt-1 pb-0`}
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
  a {
    color: rgba(0,0,0,0.75);
    text-decoration: none;
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`

const TextBody = styled(Text)`
  ${tw`text-sm pt-2 overflow-none`}
  line-height: 1.45;
`

const ImageContainer = styled.div`
  ${tw`h-full m-auto`}
  width: ${CARD_HEIGHT};
  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} / 2);
  }
`

const ExampleImage = styled(Image)`
  ${tw`mt-0 p-12`}
  width: ${CARD_HEIGHT};
  height: ${CARD_HEIGHT};
  ${MEDIA_QUERY_SMALL} {
    height: calc(${CARD_HEIGHT} / 2);
    width: calc(${CARD_HEIGHT} / 2);
    margin-top: calc(${CARD_HEIGHT} / 4);
    padding: 10px;
  }
`

const ExampleTag = styled.div`
  ${tw`relative`}
  height: ${CARD_HEIGHT};
  top: calc(
    -${CARD_HEIGHT} - 3.5px
  ); /*don't know why I have to add 3.5px here ... */
  ${MEDIA_QUERY_SMALL} {
    top: calc(-${CARD_HEIGHT} - 3.5px + (${CARD_HEIGHT} / 4));
  }
`

const SocialLink = styled(Box)`
  color: ${props => props.theme.colors.primaryLight};
`

const IconLink = styled(Link)`
  color: ${props => props.theme.colors.primaryLight};
  font-size: 2rem;
  transition: color 0.5s;
  svg {
    width: 2rem;
  }
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

const Example = ({
  title,
  description,
  projectUrl,
  repoUrl,
  tag,
  logo,
}) => (
  <Card p={0}>
    <Flex style={{ height: CARD_HEIGHT }}>
      <TextContainer>
        <span>
          <Title my={2}>
            <a href={projectUrl} target='_blank'>{title}</a>
          </Title>
        </span>
        <TextBody width={[1]}>
          {description}
        </TextBody>
      </TextContainer>

      <ImageContainer>
        <ExampleImage src={logo.childImageSharp.resize.src} alt={title} />
        <ExampleTag>
          <Flex style={{ float: 'right' }}>
            { repoUrl ?
              <Box mx={1} fontSize={5}>
                <SocialLink mt={-1} fontSize={[3, 4, 4]}>
                  <IconLink href={repoUrl} target='_blank'>
                    <Github title='GitHub'/>
                  </IconLink>
                </SocialLink>
              </Box> : '' }
            { projectUrl ?
              <Box mx={1} fontSize={5}>
                <SocialLink mt={-1} mr={3} fontSize={[3, 4, 4]}>
                  <IconLink href={projectUrl} target='_blank'>
                    <Globe title='Website'/>
                  </IconLink>
                </SocialLink>
              </Box> : '' }
          </Flex>
          <ImageSubtitle
            bg='primaryLight'
            color='white'
            y='bottom'
            x='right'
            round
          >{tag}</ImageSubtitle>
        </ExampleTag>
      </ImageContainer>
    </Flex>
  </Card>
)

Example.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  projectUrl: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
}

const Examples = () => (
  <Section.Container id='examples' className='alt'>
    <Section.Header name='Examples' />
    <StaticQuery
      query={examplesQuery}
      render={(data => {
        const examples = data.allMdx.edges
        return (
          <CardContainer minWidth='350px'>
            {examples.map(({ node }, index) => (
              <Fade bottom delay={index * 200}>
                <Example key={index} {...node.frontmatter} />
              </Fade>
            ))}
          </CardContainer>
        )
      })}
    />
    <Wave position='bottom'/>
  </Section.Container>
)

const examplesQuery = graphql`
  query ExamplesQuery {
    allMdx(filter: {fileAbsolutePath: {regex: "/Examples/"}}) {
      edges {
        node {
          frontmatter {
            title
            description
            projectUrl
            repoUrl
            tag
            logo {
              childImageSharp {
                fluid(maxWidth: 480, quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
                resize(width: 200) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Examples
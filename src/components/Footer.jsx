import React from 'react'
import tw from 'tailwind.macro'
import styled from 'styled-components'
import { Text, Flex, Box } from 'rebass'
import Fade from 'react-reveal/Fade'
import PropTypes from 'prop-types'
import GatsbyLogo from './Logo/Gatsby.svg'
import DisqusLogo from './Logo/Disqus.svg'
import swoop from './Wave/swoop_footer.svg'

const FooterContainer = styled.footer`
  ${tw`flex relative flex-initial flex-col justify-center items-center mt-16 p-4 py-8 pt-2`};
  background: linear-gradient(${props => props.theme.colors.primaryDark} 15%, ${props => props.theme.colors.primaryDarker});
  color: ${props => props.theme.colors.background};
`

const Swoop = styled.div`
  ${tw`absolute w-full pin-l mb-0`}
  background: url(${swoop}) no-repeat;
  background-size: 2045px 120px;
  background-position: 50%;
  height: 120px;
  bottom: 142px;
  content: "";
  z-index: 10 !important;
`

const ResponsiveLogo = styled.img`
  width: 100px;
  height: 25px;
  margin-bottom: 0;
  @media (min-width: 400px) {
    width: 150px;
    height: 35px;
  }
`

const And = styled(Text)`
  position: relative;
  font-size: 1.5rem;
  height: 1rem;
  top: 0.2rem;
  margin-right: 1.25rem;
`

const Logo = ({ url, logo, alt = '' }) => (
  <Box>
    <a href={url} rel='noopener noreferrer' target='_blank'>
      <ResponsiveLogo src={logo} alt={alt} />
    </a>
  </Box>
)

Logo.propTypes = {
  url: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  alt: PropTypes.string,
}

const Footer = () => (
  <FooterContainer>
    <Swoop />
    <Fade bottom>
      <span>
        <Text mb={3} pt={1} pb={1}
          style={{
            display: 'table',
            textTransform: 'uppercase',
            borderBottom: 'white 3px solid',
            marginBottom: '1rem',
          }}
        >
          Powered By
        </Text>
      </span>
      <Flex justifyContent='start' alignItems='start'>
        <Logo
          url='https://www.gatsbyjs.org/'
          logo={GatsbyLogo}
          alt='Gatsby Logo'
        />
        <And>&amp;</And>
        <Logo
          url='https://www.disqus.org/'
          logo={DisqusLogo}
          alt='Disqus Logo'
        />
      </Flex>
    </Fade>
  </FooterContainer>
)

export default Footer

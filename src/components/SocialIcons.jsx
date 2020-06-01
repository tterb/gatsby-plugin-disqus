import React from 'react'
import { Box, Link } from 'rebass'
import tw from 'tailwind.macro'
import styled from 'styled-components'
// Icons
import { Github } from 'styled-icons/boxicons-logos/Github'
import { Npm } from 'styled-icons/icomoon/Npm'
// import { Package } from 'styled-icons/boxicons-regular/Package'
import { Twitter } from 'styled-icons/boxicons-logos/Twitter'
import { Envelope } from 'styled-icons/boxicons-solid/Envelope'

const Links = styled.div`
  ${tw`flex justify-start items-start flex-wrap mt-4`}
  div:nth-child(2) a svg {
    width: 2.1rem;
  }
`

const IconLink = styled(Link)`
  ${tw`text-4xl`}
  color: ${props => props.theme.colors.backgroundLight};
  font-size: 2.25rem;
  transition: color 0.5s;
  svg {
    width: 2.75rem;
  }
  &:hover {
    color: ${props => props.theme.colors.background};
  }
`

const SocialIcons = () => (
  <Links>
    <Box mx={2} fontSize={[3, 4, 4]}>
      <IconLink href='https://github.com/tterb/gatsby-plugin-disqus' target='_blank'>
        <Github title='GitHub' />
      </IconLink>
    </Box>
    <Box mx={2} fontSize={[3, 4, 4]}>
      <IconLink href='https://www.npmjs.com/package/gatsby-plugin-disqus' target='_blank'>
        <Npm title='NPM' />
      </IconLink>
    </Box>
    <Box mx={2} fontSize={[3, 4, 4]}>
      <IconLink href='https://twitter.com/bstevensondev' target='_blank'>
        <Twitter title='Twitter' />
      </IconLink>
    </Box>
    <Box mx={2} fontSize={[3, 4, 4]}>
      <IconLink href='https://brettstevenson.io/contact' target='_blank'>
        <Envelope title='Contact' />
      </IconLink>
    </Box>
  </Links>
)

export default SocialIcons

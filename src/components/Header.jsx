import React, { Fragment } from 'react'
import Headroom from 'react-headroom'
import { Flex, Image } from 'rebass'
import tw from 'tailwind.macro'
import styled from 'styled-components'
import { SectionLinks } from 'react-scroll-section'
import Fade from 'react-reveal/Fade'
import RouteLink from './RouteLink'
import Logo from './Logo/icon.svg'

const capitalize = s => s && s[0].toUpperCase() + s.slice(1)

const HeaderContainer = styled(Headroom)`
  ${tw`absolute w-full`};
  .headroom--pinned {
    background: ${props => props.theme.colors.primaryDark};
    box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  }
  z-index: 99999;
`

const formatLinks = allLinks =>
  Object.entries(allLinks).reduce(
    (acc, [key, value]) => {
      const isHome = key === 'home'
      return isHome
        ? { ...acc, home: value, }
        : { ...acc, links: [...acc.links, { name: capitalize(key), value }] }
    },
    { links: [], home: null },
  )

const Header = () => (
  <HeaderContainer>
    <Fade top>
      <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center" p={3}>
        <SectionLinks>
          {({ allLinks }) => {
            const { home, links } = formatLinks(allLinks)

            const homeLink = home && (
              <Image
                src={Logo}
                width="40px"
                alt="Logo"
                onClick={home.onClick}
                style={{
                  marginLeft: '20px',
                  cursor: 'pointer',
                }}
              />
            )
            const navLinks = links.map(({ name, value }, index) => (
              (index > 0 ?
              <RouteLink
                key={name}
                onClick={value.onClick}
                selected={value.selected}
              >
                {name}
              </RouteLink>
            : '')))
            return (
              <Fragment>
                {homeLink}
                <Flex mr={[0, 2, 4]}>{navLinks}</Flex>
              </Fragment>
            )
          }}
        </SectionLinks>
      </Flex>
    </Fade>
  </HeaderContainer>
)

export default Header

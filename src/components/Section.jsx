import React from 'react'
import { Section } from 'react-scroll-section'
import { Heading } from 'rebass'
import tw from 'tailwind.macro'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Slide from 'react-reveal/Slide'
import LinkAnimated from './LinkAnimated'

const SectionContainer = styled.div`
  ${tw`flex flex-col justify-center m-auto z-99`}
  background: ${props => (props.background ? props.background : '#fff')};
  flex: 0 1 auto;
  padding: 0 7.5vw 6rem;
  scroll-behavior: smooth;
  h2 span {
    border-bottom-color: transparent;
  }
  &.full {
    min-height: 100vh;
    padding: 5rem 7.5vw;
  }
  &.hero {
    padding: 5rem 5.5vw !important;
  }
  &.alt {
    background: #F1EDF7;
  }
  &.first {
    padding-top: 4rem;
  }
  div div {
    z-index: 9;
  }
`

const Wrapper = styled.div`
  ${tw`w-full max-w-2xl m-auto z-10`}
`

const Title = styled(Heading)`
  ${tw`z-99`}
`

const Container = ({ id, children, background, className }) => (
  <Section id={id} style={{ position: 'relative' }}>
    <SectionContainer background={background} className={className}>
      <Wrapper>{children}</Wrapper>
    </SectionContainer>
  </Section>
)

Container.defaultProps = {
  background: '#ffffff',
}
Container.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  background: PropTypes.string,
  className: PropTypes.string,
};

const Header = ({ name, icon, label }) => (
  <Slide left>
    <Title color='primaryDark' as='h2' fontSize={[5, 6, 6]} mb={4} zIndex={99}>
      <LinkAnimated selected>
        {icon && (
          <span role='img' aria-label={label} style={{ marginRight: '10px' }}>
            {icon}
          </span>
        )}
        {name}
      </LinkAnimated>
    </Title>
  </Slide>
)

Header.defaultProps = {
  icon: '',
  label: '',
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.number,
}

export default {
  Container,
  Header,
}

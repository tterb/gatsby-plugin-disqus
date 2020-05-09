import React, { Fragment } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'
import { ScrollingProvider } from 'react-scroll-section'
import 'react-tippy/dist/tippy.css'
import config from 'react-reveal/globals'
// Components
import Helmet from './Helmet'
// Styles
import colors from '../../colors'
import 'typeface-poppins'

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before { 
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
    }

  body {
    -webkit-box-sizing: border-box;
    box-sizing: border-box; 
  }
`

config({ ssrFadeout: true })

const Layout = ({ children }) => (
  <Fragment>
    <GlobalStyle />
    <ThemeProvider theme={{ colors }}>
      <ScrollingProvider>
        <Helmet />
        {children}
      </ScrollingProvider>
    </ThemeProvider>
  </Fragment>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

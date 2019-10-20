import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import ReactHelmet from 'react-helmet'
import { withTheme } from 'styled-components'
import PropTypes from 'prop-types'

const Helmet = ({ theme = {} }) => (
  <StaticQuery
    query={helmetQuery}
    render={data => {
      const { title, description } = data.site.siteMetadata
      const icon = data.icon.childImageSharp

      return (
        <ReactHelmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="shortcut icon" href={`https:${icon.favicon32.src}`} />
          <meta name="theme-color" content={theme.background} />
          <meta name="image" content={`https:${icon.favicon32.src}`} />

          <meta itemProp="name" content={title} />
          <meta itemProp="description" content={description} />
          <meta itemProp="image" content={`https:${icon.favicon32.src}`} />

          <meta name="og:title" content={title} />
          <meta name="og:description" content={description} />
          <meta name="og:image" content={`https:${icon.bigIcon.src}`} />
          <meta name="og:site_name" content={title} />
          <meta name="og:locale" content="en_US" />
          <meta name="og:type" content="website" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={`https:${icon.bigIcon.src}`} />
          <meta name="twitter:image:src" content={`https:${icon.bigIcon.src}`} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`https:${icon.appleIcon.src}`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`https:${icon.favicon32.src}`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`https:${icon.favicon16.src}`}
          />

          <link
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossOrigin="anonymous"
          />
        </ReactHelmet>
      )
    }}
  />
)

Helmet.propTypes = {
  // eslint-disable-next-line
  theme: PropTypes.object,
}

const helmetQuery = graphql`
  query HelmetQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    icon: file(relativePath: {eq: "icon.png"}) {
      childImageSharp {
        favicon16: fixed(width: 16) {
          src
        }
        favicon32: fixed(width: 32) {
          src
        }
        bigIcon: fixed(width: 192) {
          src
        }
        appleIcon: fixed(width: 180) {
          src
        }
      }
    }
  }
`

export default withTheme(Helmet)

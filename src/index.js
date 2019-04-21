import React from 'react'
import PropTypes from 'prop-types'

import "./style.css";

export default class Disqus extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = props
    this.shortname = (typeof GATSBY_DISQUS_SHORTNAME !== `undefined` && GATSBY_DISQUS_SHORTNAME !== '') ? GATSBY_DISQUS_SHORTNAME : ''
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  componentWillMount() {
    if(typeof window != 'undefined' && window.document) {
      const component = this
      window.disqus_config = function() {
        this.page.identifier = component.state.identifier
        this.page.title = component.state.title
        this.page.url = component.state.url
      }
      const script = document.createElement('script')
      script.src = `//${this.shortname}.disqus.com/embed.js`
      script.async = true
      document.body.appendChild(script)
    }
  }

  render() {
    let props = this.props
    return (
      <div id="disqus_thread" {...props}></div>
    )
  }
}

Disqus.propTypes = {
  /*
   * Tells the Disqus service how to identify the current page. 
   * When the Disqus embed is loaded, the identifier is used to look up 
   * the correct thread. 
   */
  identifier: PropTypes.string,
  /*
   * Tells the Disqus service the title of the current page.
   * This is used when creating the thread on Disqus.
   */
  title: PropTypes.string,
  /*
   * Tells the Disqus service the URL of the current page.
   * This URL is used when a thread is created so that Disqus knows which
   * page a thread belongs to.
   * (If undefined, Disqus will use the global.location.href)
   */
  url: PropTypes.string,
}
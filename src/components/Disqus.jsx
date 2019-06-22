import React from 'react'
import PropTypes from 'prop-types'
import { insertScript, removeScript } from '../utils'
import "../style.css"

export default class Disqus extends React.Component {
  
  constructor(props) {
    super(props)
    this.shortname = (typeof GATSBY_DISQUS_SHORTNAME !== `undefined` && GATSBY_DISQUS_SHORTNAME !== '') ? GATSBY_DISQUS_SHORTNAME : ''
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  componentWillMount() {
    if(typeof window !== 'undefined' && window.document && this.shortname) {
      this.cleanInstance()
    }
  }
  
  componentDidMount() {
    this.loadInstance()
  }
  
  shouldComponentUpdate(nextProps) {
    if(this.shortname !== nextProps.shortname)
      return true
    const current = this.props.config
    const next = nextProps.config
    if(current.url === next.url && current.identifier === next.identifier)
      return false
    return true
  }
  
  componentWillUpdate(nextProps) {
    if (this.props.shortname !== nextProps.shortname)
        this.cleanInstance()
  }
  
  componentDidUpdate() {
    this.loadInstance()
  }
  
  loadInstance() {
    if(typeof window !== 'undefined' && window.document && this.shortname) {
      let component = this
      let config = this.props.config
      window.disqus_config = function() {
        this.page.identifier = config.identifier
        this.page.title = config.title
        this.page.url = config.url
      }
      insertScript(`//${this.shortname}.disqus.com/embed.js`,
                   'disqus-embed-script', window.document.body)
    }
  }
  
  cleanInstance() {
    const doc = window.document
    removeScript('disqus-embed-script', window.document.body)
    if(window && window.DISQUS) {
      window.DISQUS.reset()
    }
    try {
      delete window.DISQUS
    } catch(error) {
      window.DISQUS = undefined
    }
    const thread = window.document.getElementById('disqus_thread')
    if(thread) {
      while(thread.hasChildNodes()) {
        thread.removeChild(thread.firstChild)
      }
    }
  }

  render() {
    let { config, ...props } = this.props
    return (
      <div id='disqus_thread' {...props}></div>
    )
  }
}

Disqus.propTypes = {
  config: PropTypes.shape({
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
  }),
}
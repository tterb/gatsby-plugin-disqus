import React from 'react'
import PropTypes from 'prop-types'
import { insertScript, removeScript, debounce, shallowComparison } from '../utils'

const queueResetCount = debounce(() => {
  if(window.DISQUSWIDGETS) {
    window.DISQUSWIDGETS.getCount({ reset: true })
  }
}, 300, false)

export default class CommentCount extends React.Component {
  
  constructor(props) {
    super(props)
    this.shortname = (typeof GATSBY_DISQUS_SHORTNAME !== `undefined` && GATSBY_DISQUS_SHORTNAME !== '') ? GATSBY_DISQUS_SHORTNAME : ''
  }
  
  componentDidMount() {
    this.loadInstance()
  }

  shouldComponentUpdate(nextProps) {
    if (this.props === nextProps)
      return false
    return shallowComparison(this.props, nextProps)
  }

  componentDidUpdate() {
    this.loadInstance()
  }

  loadInstance() {
    if(window.document.getElementById('dsq-count-scr')) {
      queueResetCount()
    } else {
      insertScript(`https://${this.shortname}.disqus.com/count.js`,
                   'dsq-count-scr', window.document.body)
    }
  }
  
  cleanInstance() {
    removeScript('dsq-count-scr', window.document.body)
    window.DISQUSWIDGETS = undefined
  }

  render() {
    let { config, placeholder, ...props } = this.props
    return (
      <span className='disqus-comment-count'
            data-disqus-identifier={config.identifier}
            data-disqus-url={config.url} {...props}>
        {placeholder}
      </span>
    )
  }
}

CommentCount.defaultProps = {
  placeholder: '...',
}

CommentCount.propTypes = {
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
  /*
   * This is the text that will be used as a placeholder prior to 
   * loading the response.
   */
  placeholder: PropTypes.string,
}

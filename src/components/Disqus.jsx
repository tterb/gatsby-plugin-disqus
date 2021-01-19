import React from 'react';
import PropTypes from 'prop-types';
import { insertScript, removeScript, shallowComparison } from '../utils';
import { EMBED_ID, CALLBACK_OPTIONS } from '../constants';


export default class Disqus extends React.Component {

    constructor(props) {
        super(props);
        this.shortname = (typeof GATSBY_DISQUS_SHORTNAME !== `undefined` && GATSBY_DISQUS_SHORTNAME !== '') ? GATSBY_DISQUS_SHORTNAME : '';
        this.embedUrl = `https://${this.shortname}.disqus.com/embed.js`;
    }

    componentDidMount() {
        this.loadInstance();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props === nextProps) {
            return false;
        }
        return shallowComparison(this.props, nextProps);
    }

    componentDidUpdate() {
        this.loadInstance();
    }

    componentWillUnmount() {
        this.cleanInstance();
    }

    getDisqusConfig() {
        const config = this.props.config;
        const callbacks = this.props.callbacks;
        // const callbacks = this.getCallbacks();
        return function() {
            this.page.identifier = config.identifier;
            this.page.url = config.url;
            this.page.title = config.title;
            this.page.remote_auth_s3 = config.remoteAuthS3;
            this.page.api_key = config.apiKey;
            this.language = config.language;

            CALLBACK_OPTIONS.forEach(key => {
                this.callbacks[key] = [callbacks[key]];
            });
        };
    }

    loadInstance() {
        if (typeof window !== 'undefined' && window.document) {
            window.disqus_config = this.getDisqusConfig();
            if (window.document.getElementById(EMBED_ID)) {
                this.reloadInstance();
            } else {
                insertScript(this.embedUrl, EMBED_ID, window.document.body);
            }
        }
    }

    reloadInstance() {
        if (window && window.DISQUS) {
            window.DISQUS.reset({
                reload: true,
            });
        }
    }

    cleanInstance() {
        removeScript(EMBED_ID, window.document.body);
        try {
            delete window.DISQUS;
        } catch (error) {
            window.DISQUS = undefined;
        }
        const thread = window.document.getElementById('disqus_thread');
        if (thread) {
            while (thread.hasChildNodes()) {
                thread.removeChild(thread.firstChild);
            }
        }
        // Retrieve and remove the sidebar iframe
        const iframeQuery = window.document.querySelector('[id^="dsq-app"]');
        if (iframeQuery) {
            const iframe = window.document.getElementById(iframeQuery.id);
            iframe.parentNode.removeChild(iframe);
        }
    }

    render() {
        const { config, ...props } = this.props; // eslint-disable-line no-unused-vars
        return (
            <div id='disqus_thread' {...props} />
        );
    }
}

Disqus.propTypes = {
    config: PropTypes.shape({
        /**
        * Tells the Disqus service how to identify the current page.
        * When the Disqus embed is loaded, the identifier is used to look up
        * the correct thread.
        */
        identifier: PropTypes.string,
        /**
        * Tells the Disqus service the title of the current page.
        * This is used when creating the thread on Disqus.
        */
        title: PropTypes.string,
        /**
        * Tells the Disqus service the URL of the current page.
        * This URL is used when a thread is created so that Disqus knows which
        * page a thread belongs to.
        * (If undefined, Disqus will use the global.location.href)
        */
        url: PropTypes.string,
        /**
        * Tells the Disqus service to override the default site language for the
        * current page.
        * This allows for dynamically loading the Disqus embed in different
        * languages on a per-page basis.
        * (If undefined, Disqus will use the default site language)
        */
        language: PropTypes.string,
        /**
        The generated payload used to pass Single Sign-On (SSO) user data
        */
        remoteAuthS3: PropTypes.string,
        /**
        * This is the public API key for your Single Sign-On (SSO) integration
        */
        apiKey: PropTypes.string,
    }),
    /**
     * CALLBACKS:
     * Many of these callbacks are not officially supported, but are still present
     * in the Disqus `embed.js` config.
     */
    callbacks: PropTypes.shape({
        /**
        * This callback function is executed after the template is rendered, before
        * the comment section is displayed to the user.
        */
        afterRender: PropTypes.func,
        /**
        * This callback function is executed before a new comment is submitted on the
        * current comment thread, though it's usage is not officially supported.
        */
        beforeComment: PropTypes.func,
        /**
        * This callback function is executed after all dependencies are resolved,
        * before the comment section template is rendered.
        */
        onInit: PropTypes.func,
        /**
        * This callback function is executed when a new comment is submitted on the
        * current comment thread. It accepts one `comment` parameter, which is a
        * Javascript object containing `id` and `text` attributes.
        */
        onNewComment: PropTypes.func,
        /**
        * This callback function is executed when the comment section finishes
        * loading.
        */
        onReady: PropTypes.func,
        /**
        * This callback function is executed right before the initial comment section
        * data is requested.
        */
        preData: PropTypes.func,
        /**
        * This callback function is executed once the initial comment section data is
        * received, before loading the dependencies.
        */
        preInit: PropTypes.func,
        /**
        * The following callback functions aren't documented or officially supported
        * but can still be found in the Disqus `embed.js` config.
        */
        onIdentify: PropTypes.func,
        onPaginate: PropTypes.func,
        preReset: PropTypes.func,
    }),
}

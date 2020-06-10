import React from 'react'
import PropTypes from 'prop-types'


export default class CommentEmbed extends React.Component {

    getSrc() {
        const RADIX_BASE = 36
        const post = Number(this.props.commentId).toString(RADIX_BASE)
        const parentParam = this.props.showParentComment ? '1' : '0'
        const mediaParam = this.props.showMedia ? '1' : '0'
        return `https://embed.disqus.com/p/${post}?p=${parentParam}&m=${mediaParam}`;
    }

    render() {
        return (
            <iframe
                src={this.getSrc()}
                width={this.props.width}
                height={this.props.height}
                seamless='seamless'
                scrolling='no'
                frameBorder='0'
            />
        );
    }
}

CommentEmbed.defaultProps = {
    width: 420,
    height: 320,
    showMedia: true,
    showParentComment: true,
};
CommentEmbed.propTypes = {
    /*
     * This is used to determine the comment that gets embeded.
     * The ID can be found in the Disqus moderation panel or as a `data-post-id`
     *  attribute on the HTML element.
     */
    commentId: PropTypes.string.isRequired,
    /*
     * Determines the width of the embedded comment container.
     */
    width: PropTypes.number,
    /*
     * Determines the height of the embedded comment container.
     */
    height: PropTypes.number,
    /*
     * Determines whether the embedded comment should include or omit media from 
     * within the original comment.
     */
    showMedia: PropTypes.bool,
     /*
     * Determines whether the parent comment should be displayed for nested comments.
     */
    showParentComment: PropTypes.bool,
};

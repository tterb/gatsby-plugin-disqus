import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CommentEmbed from '../src/components/CommentEmbed';


const TEST_ID = 'comment-embed';
const commentConfig = {
    commentId: '4817304024',
    width: 680,
    height: 320,
    showMedia: true,
    showParentComment: false,
    className: 'embedded-comment',
};

const getExpectedSrc = (config) => {
    const RADIX_BASE = 36;
    const post = Number(config.commentId).toString(RADIX_BASE);
    const parentParam = config.showParentComment ? '1' : '0';
    const mediaParam = config.showMedia ? '1' : '0';
    return `https://embed.disqus.com/p/${post}?p=${parentParam}&m=${mediaParam}`;
};

const Component = (props) => (
    <CommentEmbed
        data-testid={TEST_ID}
        {...props}
    />
);

// Cleanup tests to prevent memory leaks
afterEach(cleanup);

test('Has correct attributes', () => {
    const { getByTestId } = render(<Component {...commentConfig} />);
    // Check the iframe has the correct 'src'
    expect(getByTestId(TEST_ID)).toHaveAttribute('src', getExpectedSrc(commentConfig));
    // Check the correct 'width' is assigned
    expect(getByTestId(TEST_ID)).toHaveAttribute('width', commentConfig.width.toString());
    // Check the correct 'height' is assigned
    expect(getByTestId(TEST_ID)).toHaveAttribute('height', commentConfig.height.toString());
    // Check that the 'className' is assigned to the iframe
    expect(getByTestId(TEST_ID)).toHaveAttribute('class', commentConfig.className);
});

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CommentCount from '../src/components/CommentCount';
import { COMMENT_COUNT_ID } from '../src/constants';


const TEST_ID = 'comment-count';
const TEST_CONFIG = {
    url: 'https://joy-of-testing.com/',
    title: 'Joy of Testing',
    identifier: 'tester',
};

const Component = (props) => (
    <CommentCount
        data-testid={TEST_ID}
        {...props}
    />
);

// Cleanup tests to prevent memory leaks
afterEach(cleanup);

test('Has correct config attributes', () => {
    const { getByTestId } = render(<Component config={TEST_CONFIG} />);
    // Check that the url is set correctly
    expect(getByTestId(TEST_ID)).toHaveAttribute('data-disqus-url', TEST_CONFIG.url);
    // Check that the identifier is set correctly
    expect(getByTestId(TEST_ID)).toHaveAttribute('data-disqus-identifier', TEST_CONFIG.identifier);
});

test('Has correct classes', () => {
    const customClass = 'custom-class';
    const { getByTestId } = render(
        <Component
            config={TEST_CONFIG}
            className={customClass}
        />
    );
    const classList = getByTestId(TEST_ID).classList;
    // Check for the default class
    expect(classList).toContain('disqus-comment-count');
    // Check that the custom class is added
    expect(classList).toContain(customClass);
});

test('Displays the correct placeholder text', () => {
    const customPlaceholder = 'hold my place';
    const { getByTestId } = render(
        <Component
            config={TEST_CONFIG}
            placeholder={customPlaceholder}
        />
    );
    expect(getByTestId(TEST_ID)).toHaveTextContent(customPlaceholder);
});

test('Inserts the script correctly', () => {
    const { baseElement } = render(<Component config={TEST_CONFIG} />);
    const scriptQuery = baseElement.querySelectorAll(`#${COMMENT_COUNT_ID}`);
    // Make sure only one script is inserted
    expect(scriptQuery.length).toEqual(1);
    // Check that the script src is set correctly
    expect(scriptQuery[0].src).toEqual('https://testing.disqus.com/count.js');
});

test('Cleans script and window attributes on unmount', () => {
    const { baseElement, unmount } = render(<Component config={TEST_CONFIG} />);
    unmount();
    const scriptQuery = baseElement.querySelectorAll(`#${COMMENT_COUNT_ID}`);
    // Make sure the script is removed
    expect(scriptQuery.length).toEqual(0);
    // Make sure window.DISQUSWIDGETS is removed
    expect(global.window.DISQUSWIDGETS).toBeUndefined();
});

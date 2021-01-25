import React from 'react';
import { render, cleanup } from '@testing-library/react';
// Components
import CommentCount from '../src/components/CommentCount.jsx';


const disqusConfig = {
    url: 'https://joy-of-testing.com/',
    title: 'Joy of Testing',
    identifier: 'tester',
};

const Component = (props) => (
    <CommentCount
        data-testid='comment-count'
        {...props}
    />
);

// Cleanup tests to prevent memory leaks
afterEach(cleanup)

test('Has correct config attributes', () => {
    const { getByTestId } = render(<Component config={disqusConfig} />);
    // Check that the url is set correctly
    expect(getByTestId('comment-count')).toHaveAttribute('data-disqus-url', disqusConfig.url);
    // Check that the identifier is set correctly
    expect(getByTestId('comment-count')).toHaveAttribute('data-disqus-identifier', disqusConfig.identifier);
});

test('Has correct classes', () => {
    const customClass = 'custom-class';
    const { getByTestId } = render(
        <Component
            config={disqusConfig}
            className={customClass}
        />
    );
    const classList = getByTestId('comment-count').classList
     // Check for the default class
    expect(classList).toContain('disqus-comment-count');
    // Check that the custom class is added
    expect(classList).toContain(customClass);
});

test('Displays the correct placeholder text', () => {
    const customPlaceholder = 'hold my place';
    const { getByTestId } = render(
        <Component
            config={disqusConfig}
            placeholder={customPlaceholder}
        />
    );
    expect(getByTestId('comment-count')).toHaveTextContent(customPlaceholder);
});

test('Inserts the script correctly', () => {
    const { baseElement } = render(<Component config={disqusConfig} />);
    const scriptQuery = baseElement.querySelectorAll('#dsq-count-scr');
    // Make sure only one script is inserted
    expect(scriptQuery.length).toEqual(1);
    // Check that the script src is set correctly
    expect(scriptQuery[0].src).toEqual('https://testing.disqus.com/count.js');
});

test('Cleans script and window attributes on unmount', () => {
    const { baseElement, unmount } = render(<Component config={disqusConfig} />);
    unmount()
    const scriptQuery = baseElement.querySelectorAll('#dsq-count-scr');
    // Make sure the script is removed
    expect(scriptQuery.length).toEqual(0);
    // Make sure window.DISQUSWIDGETS is removed
    expect(global.window.DISQUSWIDGETS).toBeUndefined();
});

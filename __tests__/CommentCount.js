import React from 'react';
import { render } from '@testing-library/react';
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

test('Has correct config attributes', () => {
    const { getByTestId } = render(<Component config={disqusConfig} />);
    // Check that the url is set correctly
    expect(getByTestId('comment-count')).toHaveAttribute('data-disqus-url', disqusConfig.url);
    // Check that the identifier is set correctly
    expect(getByTestId('comment-count')).toHaveAttribute('data-disqus-identifier', disqusConfig.identifier);
});

test('Has the correct classes', () => {
    const customClass = 'custom-class';
    const { getByTestId } = render(
        <Component
            config={disqusConfig}
            className={customClass}
        />
    );
    expect(getByTestId('comment-count').classList).toContain('disqus-comment-count');
    expect(getByTestId('comment-count').classList).toContain(customClass);
});

test('Has the correct placeholder text', () => {
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
    const { container } = render(<Component config={disqusConfig} />);
    const scriptQuery = container.parentNode.querySelectorAll('#dsq-count-scr');
    // Make sure only one script is inserted
    expect(scriptQuery.length).toEqual(1);
    // Check that the script src is set correctly
    expect(scriptQuery[0].src).toEqual('https://testing.disqus.com/count.js');
});

import React from 'react';
import { render, cleanup } from '@testing-library/react';
// Components
import Disqus from '../src/components/Disqus.jsx';


const disqusConfig = {
    url: 'https://joy-of-testing.com/',
    title: 'Joy of Testing',
    identifier: 'tester',
};

const Component = (props) => (
    <Disqus
        data-testid='disqus-thread'
        {...props}
    />
);

// Cleanup tests to prevent memory leaks
afterEach(cleanup);

test('Has correct attributes', () => {
    const { getByTestId } = render(<Component config={disqusConfig} />);
    // Check that the correct ID is added
    expect(getByTestId('disqus-thread')).toHaveAttribute('id', 'disqus_thread');
});

test('Creates window.disqus_config', () => {
    render(<Component config={disqusConfig} />);
    expect(global.window.disqus_config).toBeTruthy();
});

test('Inserts the script correctly', () => {
    const { baseElement } = render(<Component config={disqusConfig} />);
    const scriptQuery = baseElement.querySelectorAll('#dsq-embed-scr');
    // Make sure only one script is inserted
    expect(scriptQuery.length).toEqual(1);
    // Check that the script src is set correctly
    expect(scriptQuery[0].src).toEqual('https://testing.disqus.com/embed.js');
});

test('Cleans script and window attributes on unmount', () => {
    const { baseElement, unmount } = render(<Component config={disqusConfig} />);
    unmount();
    const scriptQuery = baseElement.querySelectorAll('#dsq-embed-scr');
    // Make sure the script is removed
    expect(scriptQuery.length).toEqual(0);
    // Make sure window.DISQUS is removed
    expect(global.window.DISQUS).toBeUndefined();
});

module.exports = {
    setupFilesAfterEnv: ['<rootDir>/config/setup-test-env.js'],
};
module.exports = {
    transform: {
        '^.+\\.jsx?$': `<rootDir>/config/jest-preprocess.js`,
    },
    setupFilesAfterEnv: ['<rootDir>/config/setup-test-env.js'],
    testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
    transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
    globals: {
        __PATH_PREFIX__: ``,
        GATSBY_DISQUS_SHORTNAME: 'testing',
    },
    testURL: `http://localhost`,
};

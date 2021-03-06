module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    plugins: ['import', 'prettier'],
    rules: {
        'prettier/prettier': ['error'],
    },
};

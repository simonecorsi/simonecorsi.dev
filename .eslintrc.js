module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        es6: true,
        node: true,
        commonjs: true,
        browser: true,
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/strict',
        'plugin:react-hooks/recommended',
    ],
    rules: {
        'no-console': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/jsx-no-target-blank': 'off',
        'no-unused-vars': 0,
        'no-undef': 0, // see https://github.com/typescript-eslint/typescript-eslint/issues/342#issuecomment-484739065
        'no-empty': 0,
        'jsx-a11y/no-onchange': 0, //see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/398
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/label-has-for': [
            2,
            {
                required: {
                    some: ['nesting', 'id'],
                },
            },
        ],
    },
    globals: {
        React: 'writable',
        EventListenerOrEventListenerObject: false,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};

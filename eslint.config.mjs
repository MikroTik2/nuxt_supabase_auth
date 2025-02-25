import antfu from '@antfu/eslint-config';

export default antfu({
    vue: true,
    // typescript: true,
    formatters: {
        css: true,
        html: true,
        json: true,
        markdown: 'prettier',
    },
    stylistic: {
        indent: 4,
        quotes: 'single',
        semi: true,
    },
    ignores: [
        'dist',
        'node_modules',
        '*.min.js',
        'coverage',
    ],
}, {
    rules: {
        'ts/no-explicit-any': 'off',
        'no-undef': 'off',
        'yaml/indent': 'off',
        'vue/multi-word-component-names': 'off',
        'symbol-description': 'off',

        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/html-self-closing': ['error', {
            html: {
                void: 'always',
                normal: 'always',
                component: 'always',
            },
        }],

        'no-console': 'warn',
        'eqeqeq': ['error', 'always'],
    },
});

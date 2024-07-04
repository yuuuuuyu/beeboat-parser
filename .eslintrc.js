module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    globals: {
        // Ref sugar (take 2)
        $: 'readonly',
        $$: 'readonly',
        $ref: 'readonly',
        $shallowRef: 'readonly',
        $computed: 'readonly',

        // index.d.ts
        // global.d.ts
        Fn: 'readonly',
        PromiseFn: 'readonly',
        RefType: 'readonly',
        LabelValueOptions: 'readonly',
        EmitType: 'readonly',
        TargetContext: 'readonly',
        ComponentElRef: 'readonly',
        ComponentRef: 'readonly',
        ElRef: 'readonly',
        global: 'readonly',
        ForDataType: 'readonly',
        ComponentRoutes: 'readonly',

        // script setup
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/eslint-config-typescript',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
    },
    rules: {
        // js/ts https://eslint.org/docs/rules
        'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'eol-last': 'error',
        'no-trailing-spaces': 'error',
        'comma-style': ['error', 'last'],
        'comma-dangle': ['error', 'always-multiline'],
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        camelcase: 0,
        semi: ['error', 'never'],
        // indent: ['error', 4, { SwitchCase: 1 }],
        'object-curly-spacing': ['error', 'always'],
        'arrow-parens': ['error', 'as-needed'],
        'quote-props': ['error', 'as-needed'],
        'prefer-template': 'error',

        'vue/no-v-html': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-indent': ['error', 4],
        'vue/require-default-prop': 'off',
        'vue/require-explicit-emits': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/one-component-per-file': 'off',
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 5,
                multiline: 1,
            },
        ],
        'vue/html-closing-bracket-spacing': 'error',
        'vue/no-mutating-props': 'off',
        'vue/v-on-event-hyphenation': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'never',
                },
                svg: 'always',
                math: 'always',
            },
        ],

        '@typescript-eslint/no-explicit-any': 'off', // any
        '@typescript-eslint/explicit-module-boundary-types': 'off', // setup()
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'none',
                    requireLast: false,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                },
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
    },
}

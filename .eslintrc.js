module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
    },
    extends: ['airbnb'],
    rules: {
        "indent": ["error",4, { "SwitchCase": 1 }],
        "array-bracket-spacing": ["error", "always"],
        "import/prefer-default-export": 0,
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "import/no-unresolved": "off",
        "react/jsx-one-expression-per-line": ["error", { "allow": "single-child" }],
        "jsx-a11y/label-has-associated-control": "off",
    },
};

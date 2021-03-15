module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-typescript', 'prettier/@typescript-eslint', 'prettier', 'prettier/react'],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-nested-ternary': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': 'off',
  },
  plugins: ['react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};

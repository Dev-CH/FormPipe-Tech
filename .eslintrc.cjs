module.exports = {
  extends: ['mantine', 'eslint-config-mantine', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'linebreak-style': ['error', 'unix'],
    'import/extensions': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'caughtErrorsIgnorePattern': '^_'
    }]
  },
};

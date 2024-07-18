module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'amd': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'plugins': [ '@typescript-eslint', ],
  'overrides': [],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'windows',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'never',
    ],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always',
        'objects': 'always',
        'imports': 'never',
        'exports': 'never',
        'functions': 'never',
      },
    ],
    'array-element-newline': [
      'error',
      {
        'ArrayExpression': {
          'multiline': true,
          'minItems': 2,
        },
        'ArrayPattern': {
          'multiline': true,
          'minItems': 3,
        },
      },
    ],
    'array-bracket-newline': [
      'error',
      {
        'multiline': true,
        'minItems': 3,
      },
    ],
    'array-bracket-spacing': [
      'error',
      'always',
    ],
    'object-property-newline': 'error',
    'object-curly-newline': [
      'error',
      {
        'ObjectExpression': { 'multiline': true, },
        'ObjectPattern': { 'multiline': true, },
        'ImportDeclaration': {
          'minProperties': 8,
          'multiline': true,
        },
        'ExportDeclaration': { 'minProperties': 3, },
      },
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'prefer-const': 'error',
    'no-unused-vars': 'error',
    'no-var': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}

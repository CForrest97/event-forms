module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'airbnb-base',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-extraneous-dependencies': ["error", { "devDependencies": true, "optionalDependencies": false, "peerDependencies": false }],
    'import/no-unresolved': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'no-empty-function': 'off',
  },
  "settings": {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx", ".mjs"]
  },
};

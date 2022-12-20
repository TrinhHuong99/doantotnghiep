module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    "no-unused-vars": "off",
    "vue/no-reserved-keys": "off",
    "vue/no-unused-components": "off",
    "valid-typeof": "off"
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  }
}

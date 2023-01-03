module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/multi-word-component-names': 'off',
    camelcase: 'off',
    'vue/no-mutating-props': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

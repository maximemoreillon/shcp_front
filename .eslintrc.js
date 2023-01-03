module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/multi-word-component-names": "off",
    camelcase: "off",
    "vue/no-mutating-props": "off",
    semi: "off",
    "comma-dangle": "off",
    quotes: "off",
    "space-before-function-paren": "off",
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "@vue/standard"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off", // 禁用未使用變量的檢查
    indent: ["error", 2], // 調整縮進為 2 個空格
    semi: "off", // 禁用對分號的要求
    "vue/multi-word-component-names": "off",
    "prefer-const": "off",           // 允許使用 let，即使變量未重新賦值
    "no-trailing-spaces": "off",     // 允許行末空格
    "spaced-comment": "off"          // 允許不帶空格的注釋
  },
};

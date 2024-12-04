import antfu from "@antfu/eslint-config"

// TS Rules that make ESLint ~10x slower but you can add them if you want but you need typescript configuration
// Future: Burn ESLint down after Void Zero comes out
// /** @type {import("@antfu/eslint-config").Rules} */
// const rulesThatBreakOnCLI = {
//   "ts/no-floating-promises": "error",
// }

export default antfu({
  vue: true,
  formatters: false,
  gitignore: true,
  ignores: ["dist", "node_modules", "public", ".output", ".nuxt", ".vercel", ".github", ".husky"],
  stylistic: {
    indent: 2,
    quotes: "double",
  },
  lessOpinionated: true,
  rules: {
    "style/brace-style": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/html-self-closing": "off",
    "vue/no-child-content": "off",
    "ts/consistent-type-definitions": "off",
    "node/prefer-global/process": "off",
    "unused-imports/no-unused-imports": "warn",
    "antfu/consistent-list-newline": "off",
    "unicorn/no-instanceof-array": "off",
    "unicorn/number-literal-case": "off",
  },
})

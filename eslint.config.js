import antfu from "@antfu/eslint-config"

// Future: Burn ESLint down after Void Zero comes out
/** @type {import("@antfu/eslint-config").Rules} */
const rulesThatBreakOnCLI = {
  "ts/no-floating-promises": "error",
}

export default antfu({
  vue: true,
  formatters: false,
  typescript: {
    parserOptions: {
      projectService: true,
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  gitignore: true,
  rules: {
    "style/quotes": "off",
    "style/member-delimiter-style": "off",
    "style/quote-props": ["error", "as-needed"],
    "style/brace-style": ["error", "1tbs", { allowSingleLine: false }],
    "style/arrow-parens": ["error", "always"],
    "style/indent": "off",
    "style/indent-binary-ops": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/html-self-closing": "off",
    "ts/consistent-type-definitions": "off",
    "node/prefer-global/process": "off",
    "unused-imports/no-unused-imports": "warn",
    "antfu/consistent-list-newline": "off",

    ...(process.env.ESLINT_CLI ? {} : rulesThatBreakOnCLI),
  },
})

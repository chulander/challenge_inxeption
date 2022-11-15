module.exports = {
  env: {
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["node_modules/", "dist/"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: "module",
    extraFileExtensions: [".json"],
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/ban-ts-ignore": "off",
  },
};

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    monaco: "readonly",
    ipcRenderer: "readonly",
    module: "readonly",
    fs: "readonly",
    electron: "readonly",
    auth: "readonly",
    require: "readonly",
    process: "readonly",
    remote: "readonly",
    __dirname: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  parser: "babel-eslint",
  rules: {
    strict: 0,
    "react/prop-types": 0,
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
};

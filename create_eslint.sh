#!/bin/bash

echo "extends: vue
parser: babel-eslint
root: true
env:
  es6: true
  node: true
  browser: true
parserOptions:
  ecmaVersion: 6
  allowImportExportEverywhere: false
globals:
  $: true
  window: true
  require: true
  CSRF_TOKEN: true
rules:
  indent:
    - 1
    - 2
  quotes:
    - 1
    - single
  linebreak-style:
    - 2
    - unix
  semi:
    - 1
    - never
  no-undef:
    - 2
  space-before-function-paren:
    - 0
  array-bracket-spacing:
    - 0
  one-var:
    - 0
    - always
  prefer-const:
    - 0
  comma-dangle:
    - 1
    - only-multiline" >> ./.eslintrc.yaml

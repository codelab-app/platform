import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { Completion, CompletionSource } from '@codemirror/autocomplete'
import { css } from '@codemirror/lang-css'
import { esLint, javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { StreamLanguage } from '@codemirror/language'
import { linter, lintGutter } from '@codemirror/lint'
import { graphql } from 'codemirror-graphql/cm6-legacy/mode'
import * as eslint from 'eslint-linter-browserify'
import React from 'react'
import { CodeMirrorInput, CodeMirrorInputProps } from './CodeMirrorInput'
import { defaultExtensions } from './setup'

const config = {
  // eslint configuration
  extends: ['eslint:recommended'],
  rules: {},
  env: {
    browser: true,
    node: true,
  },
}

export interface CodeMirrorEditorProps extends CodeMirrorInputProps {
  language?: CodeMirrorLanguage
  defaultSource?: CompletionSource
  defaultOptions?: Array<Completion>
  customOptions?: Array<Completion>
}

const languageExtension = {
  [CodeMirrorLanguage.Css]: [css()],
  [CodeMirrorLanguage.Javascript]: [
    lintGutter(),
    linter(esLint(new eslint.Linter())),
    javascript(),
  ],
  [CodeMirrorLanguage.Typescript]: [
    lintGutter(),
    linter(esLint(new eslint.Linter())),
    javascript({ typescript: true }),
  ],
  [CodeMirrorLanguage.Json]: [json()],
  [CodeMirrorLanguage.CssInJs]: [css()],
  // once https://github.com/graphql/graphiql/pull/2620 is merged will add full support for graphql
  [CodeMirrorLanguage.Graphql]: [StreamLanguage.define(graphql)],
}

export const CodeMirrorEditor = (props: CodeMirrorEditorProps) => {
  const { language, extensions = [], expandable = true } = props
  const basicExtensions = defaultExtensions(props)

  const mergedExtension = language
    ? [...languageExtension[language], ...basicExtensions, ...extensions]
    : [...basicExtensions, ...extensions]

  return (
    <CodeMirrorInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      expandable={expandable}
      extensions={mergedExtension}
    />
  )
}

CodeMirrorEditor.displayName = 'CodeMirrorEditor'

import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { css } from '@codemirror/lang-css'
import { esLint, javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { StreamLanguage } from '@codemirror/language'
import { linter, lintGutter } from '@codemirror/lint'
import { graphql } from 'codemirror-graphql/cm6-legacy/mode'
import * as eslint from 'eslint-linter-browserify'
import React from 'react'
import { CodeMirrorInput, CodeMirrorInputProps } from './CodeMirrorInput'

export interface CodeMirrorEditorProps extends CodeMirrorInputProps {
  language?: CodeMirrorLanguage
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
  [CodeMirrorLanguage.Graphql]: [StreamLanguage.define(graphql)],
}

export const CodeMirrorEditor = (props: CodeMirrorEditorProps) => {
  const { language, extensions = [] } = props

  return (
    <CodeMirrorInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      extensions={
        language ? [...languageExtension[language], ...extensions] : extensions
      }
      shouldDisableNewLines={false}
    />
  )
}

CodeMirrorEditor.displayName = 'CodeMirrorEditor'

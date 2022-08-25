import 'eslint-linter-browserify'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { StreamLanguage } from '@codemirror/language'
import { Extension } from '@uiw/react-codemirror'
import { graphql } from 'codemirror-graphql/cm6-legacy/mode'
import React from 'react'
import { CodeMirrorInput, CodeMirrorInputProps } from './codeMirrorInput'

export interface CodeMirrorEditorProps extends CodeMirrorInputProps {
  language?: CodeMirrorLanguage
}

const languageExtension: { [lang in CodeMirrorLanguage]: Array<Extension> } = {
  [CodeMirrorLanguage.Css]: [css()],
  [CodeMirrorLanguage.Javascript]: [javascript()],
  [CodeMirrorLanguage.Typescript]: [javascript({ typescript: true })],
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
        language ? languageExtension[language].concat(extensions) : extensions
      }
      shouldDisableNewLines={false}
    />
  )
}

CodeMirrorEditor.displayName = 'CodeMirrorEditor'

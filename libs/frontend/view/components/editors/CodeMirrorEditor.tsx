import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import React from 'react'
import { CodeMirrorInput } from './codeMirrorInput'
import { CodeMirrorEditorProps } from './codeMirrorInput/types'

const languageExtension = {
  [CodeMirrorLanguage.Css]: [css()],
  [CodeMirrorLanguage.Javascript]: [javascript()],
  [CodeMirrorLanguage.Typescript]: [javascript({ typescript: true })],
  [CodeMirrorLanguage.Json]: [json()],
  [CodeMirrorLanguage.CssInJs]: [css()],
  [CodeMirrorLanguage.Graphql]: [json()],
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

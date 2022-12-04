import { ICodeMirrorLanguage } from '@codelab/shared/abstract/core'
import type { Completion, CompletionSource } from '@codemirror/autocomplete'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { lintGutter } from '@codemirror/lint'
import { graphql } from 'cm6-graphql'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CodeMirrorInput, CodeMirrorInputProps } from './CodeMirrorInput'
import { defaultExtensions } from './setup'

export interface CodeMirrorEditorProps extends CodeMirrorInputProps {
  language?: ICodeMirrorLanguage
  defaultSource?: CompletionSource
  defaultOptions?: Array<Completion>
  customOptions?: Array<Completion>
  overrideExtensions?: boolean
}

const languageExtension = {
  [ICodeMirrorLanguage.Css]: [css()],
  [ICodeMirrorLanguage.Javascript]: [
    lintGutter(),
    // linter(esLint(new eslint.Linter())),
    javascript({ jsx: true }),
  ],
  [ICodeMirrorLanguage.Typescript]: [
    lintGutter(),
    // linter(esLint(new eslint.Linter())),
    javascript({ typescript: true }),
  ],
  [ICodeMirrorLanguage.Json]: [json()],
  [ICodeMirrorLanguage.CssInJs]: [css()],
  // once https://github.com/graphql/graphiql/pull/2620 is merged will add full support for graphql
  [ICodeMirrorLanguage.Graphql]: [graphql()],
}

export const CodeMirrorEditor = observer((props: CodeMirrorEditorProps) => {
  const {
    language,
    extensions = [],
    expandable = true,
    overrideExtensions = false,
  } = props

  const basicExtensions = overrideExtensions ? [] : defaultExtensions(props)

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
})

CodeMirrorEditor.displayName = 'CodeMirrorEditor'

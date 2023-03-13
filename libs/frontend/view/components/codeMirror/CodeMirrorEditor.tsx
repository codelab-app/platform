import { ICodeMirrorLanguage } from '@codelab/shared/abstract/core'
import type { Completion, CompletionSource } from '@codemirror/autocomplete'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import type { CodeMirrorInputProps } from './CodeMirrorInput'
import { CodeMirrorInput } from './CodeMirrorInput'
import { getDefaultExtensions } from './setup'

export interface CodeMirrorEditorProps extends CodeMirrorInputProps {
  language?: ICodeMirrorLanguage
  defaultSource?: CompletionSource
  defaultOptions?: Array<Completion>
  customOptions?: Array<Completion>
  overrideExtensions?: boolean
}

const getLanguageExtension = async (language?: ICodeMirrorLanguage) => {
  switch (language) {
    case ICodeMirrorLanguage.Css:
    case ICodeMirrorLanguage.CssInJs:
      return import('@codemirror/lang-css').then(({ css }) => [css()])

    case ICodeMirrorLanguage.Javascript:
    case ICodeMirrorLanguage.Typescript:
      return Promise.all([
        import('@codemirror/lang-javascript'),
        import('@codemirror/lint'),
      ]).then(([{ javascript }, { lintGutter }]) => [
        lintGutter(),
        javascript({
          jsx: true,
          typescript: language === ICodeMirrorLanguage.Typescript,
        }),
      ])

    case ICodeMirrorLanguage.Json:
      return import('@codemirror/lang-json').then(({ json }) => [json()])

    // once https://github.com/graphql/graphiql/pull/2620 is merged will add full support for graphql
    case ICodeMirrorLanguage.Graphql:
      return import('cm6-graphql').then(({ graphql }) => [graphql()])

    default:
      return []
  }
}

export const CodeMirrorEditor = observer((props: CodeMirrorEditorProps) => {
  const {
    expandable = true,
    extensions = [],
    language,
    overrideExtensions = false,
  } = props

  const { value } = useAsync(
    () =>
      Promise.all([
        getLanguageExtension(language),
        overrideExtensions ? [] : getDefaultExtensions(props),
      ]),
    [],
  )

  const [languageExtension, basicExtensions] = value ?? []

  const mergedExtension = [
    ...(languageExtension ?? []),
    ...(basicExtensions ?? []),
    ...extensions,
  ]

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

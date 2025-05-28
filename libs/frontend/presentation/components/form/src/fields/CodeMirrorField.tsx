'use client'

import type { ICodeMirrorLanguage } from '@codelab/shared/abstract/core'
import type { Completion } from '@codemirror/autocomplete'

import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { connectField } from 'uniforms'
import { type TextFieldProps, wrapField } from 'uniforms-antd'

export type CodeMirrorFieldProps = TextFieldProps & {
  customOptions?: Array<Completion>
  language: ICodeMirrorLanguage
}

export const CodeMirrorField = connectField<CodeMirrorFieldProps>(
  (props) => {
    return wrapField(
      props,
      <CodeMirrorEditor
        {...props}
        height="auto"
        maxHeight="150px"
        title={props.label?.toString()}
        width="100%"
      />,
    )
  },
  {
    kind: 'leaf',
  },
)

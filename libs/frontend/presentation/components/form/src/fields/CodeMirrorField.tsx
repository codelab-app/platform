'use client'

import type { Completion } from '@codemirror/autocomplete'
import type { TextFieldProps } from 'uniforms-antd'

import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { connectField } from 'uniforms'

export type CodeMirrorFieldProps = TextFieldProps & {
  customOptions?: Array<Completion>
}

export const CodeMirrorField = connectField<CodeMirrorFieldProps>(
  (props) => {
    return (
      <CodeMirrorEditor
        {...props}
        height="auto"
        maxHeight="150px"
        width="100%"
      />
    )
  },
  {
    kind: 'leaf',
  },
)

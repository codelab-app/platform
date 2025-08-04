'use client'

import type { ICodeMirrorLanguage } from '@codelab/shared-abstract-core'
import type { Completion } from '@codemirror/autocomplete'

import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { isString } from 'antd/lib/button'
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
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        height="auto"
        label={isString(props.label) ? props.label : props.name}
        maxHeight="150px"
        title={isString(props.label) ? props.label : props.name}
        width="100%"
      />,
    )
  },
  {
    kind: 'leaf',
  },
)

import { Form } from 'antd'
import React, { Ref } from 'react'
import { connectField, FieldProps } from 'uniforms'
import { CodeMirrorEditor, CodeMirrorEditorProps } from '../../codeMirror'

type CodeMirrorFieldProps = FieldProps<
  string,
  CodeMirrorEditorProps,
  { inputRef?: Ref<typeof CodeMirrorEditor> }
>

export const CodeMirrorField = (mainProps?: Partial<CodeMirrorEditorProps>) =>
  connectField<CodeMirrorFieldProps>(
    (baseProps) => {
      const merged = { ...baseProps, ...mainProps }

      return (
        <Form.Item label={baseProps.label ?? ''}>
          <CodeMirrorEditor
            height="150px"
            value={merged.value || ''}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...merged}
          />
        </Form.Item>
      )
    },
    {
      kind: 'leaf',
    },
  )

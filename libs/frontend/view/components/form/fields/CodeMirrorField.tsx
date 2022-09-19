import { Form } from 'antd'
import React, { Ref } from 'react'
import { connectField, FieldProps } from 'uniforms'
import { CodeMirrorEditor, CodeMirrorEditorProps } from '../../codeMirror'

type CodeMirrorFieldProps = FieldProps<
  string,
  CodeMirrorEditorProps,
  { inputRef?: Ref<HTMLDivElement> }
>

export const CodeMirrorField = (mainProps?: Partial<CodeMirrorEditorProps>) =>
  connectField<CodeMirrorFieldProps>(
    (baseProps) => {
      const merged = { ...mainProps, ...baseProps }

      return (
        <Form.Item label={baseProps.label ?? ''}>
          <CodeMirrorEditor
            height="150px"
            value={merged.value}
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

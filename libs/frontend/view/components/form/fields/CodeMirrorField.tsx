import { Form } from 'antd'
import React, { Ref } from 'react'
import { connectField, FieldProps } from 'uniforms'
import { CodeMirrorEditor, CodeMirrorEditorProps } from '../../codeMirror'

type CodeMirrorFieldProps = FieldProps<
  string,
  CodeMirrorEditorProps,
  { inputRef?: Ref<HTMLDivElement> }
>

export const CodeMirrorField = (mainProps?: Partial<CodeMirrorEditorProps>) => {
  const Component = React.memo(
    connectField<CodeMirrorFieldProps>(
      (baseProps) => {
        const merged = { ...mainProps, ...baseProps }

        /**
         * TODO: should interpret type
         * number should be read as string
         * currently, everything is interpreted as string
         */
        return (
          <Form.Item label={baseProps.label ?? ''}>
            <CodeMirrorEditor
              height="150px"
              value={merged.value || merged.field?.default}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...merged}
            />
          </Form.Item>
        )
      },
      {
        kind: 'leaf',
      },
    ),
  )

  Component.displayName = 'CodeMirrorField'

  return Component
}

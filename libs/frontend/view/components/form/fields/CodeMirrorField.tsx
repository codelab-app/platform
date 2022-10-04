import { Form } from 'antd'
import React, { Ref } from 'react'
import { connectField, FieldProps } from 'uniforms'
import { CodeMirrorEditor, CodeMirrorEditorProps } from '../../codeMirror'

type MainPropsOnChange = (
  value: string,
  uniformsOnChange: (value: string | undefined) => void,
) => void

type CodeMirrorFieldProps = Omit<CodeMirrorEditorProps, 'onChange'> & {
  onChange: MainPropsOnChange
}

type CodeMirrorConnectFieldProps = FieldProps<
  string,
  CodeMirrorEditorProps,
  {
    inputRef?: Ref<HTMLDivElement>
  }
>

export const CodeMirrorField = (mainProps?: Partial<CodeMirrorFieldProps>) => {
  const Component = React.memo(
    connectField<CodeMirrorConnectFieldProps>(
      (baseProps) => {
        const merged = { ...mainProps, ...baseProps }

        const mainPropsOnChange = (value: string) => {
          mainProps?.onChange && mainProps.onChange(value, baseProps.onChange)
        }

        const onChange = mainProps?.onChange
          ? mainPropsOnChange
          : baseProps.onChange

        /**
         * TODO: should interpret type
         * number should be read as number
         * currently, everything is interpreted as string
         */

        return (
          <Form.Item label={baseProps.label ?? ''}>
            <CodeMirrorEditor
              height="150px"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...merged}
              onChange={onChange}
              value={String(merged.value || merged.field?.default)}
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

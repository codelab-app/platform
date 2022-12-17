import { Form } from 'antd'
import type { Ref } from 'react'
import React from 'react'
import type { FieldProps } from 'uniforms'
import { connectField } from 'uniforms'
import type { CodeMirrorEditorProps } from '../../codeMirror'
import { CodeMirrorEditor } from '../../codeMirror'

export type Value = string | number | boolean | undefined

export type MainPropsOnChange = (
  value: Value,
  uniformsOnChange: (value: Value) => void,
) => void

type CodeMirrorFieldProps = Omit<CodeMirrorEditorProps, 'onChange'> & {
  onChange: MainPropsOnChange
}

type CodeMirrorConnectFieldProps = FieldProps<
  Value,
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

        const mainPropsOnChange = (value: Value) => {
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
              height="auto"
              maxHeight="150px"
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

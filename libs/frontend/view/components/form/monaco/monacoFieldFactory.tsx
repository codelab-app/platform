import { Form } from 'antd'
import React, { Ref } from 'react'
import { connectField, HTMLFieldProps } from 'uniforms'
import { MonacoEditor, MonacoEditorProps } from '../../editors/monaco'

export type MonacoFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputRef?: Ref<HTMLTextAreaElement> }
>

export const monacoFieldFactory = (
  monacoProps: Omit<MonacoEditorProps, 'value' | 'onChange'>,
) =>
  connectField<MonacoFieldProps>(
    (props) => {
      return (
        <Form.Item label={props.label ?? ''}>
          <MonacoEditor
            onChange={props.onChange as any}
            value={props.value as string}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...monacoProps}
          />
        </Form.Item>
      )
    },
    {
      kind: 'leaf',
    },
  )

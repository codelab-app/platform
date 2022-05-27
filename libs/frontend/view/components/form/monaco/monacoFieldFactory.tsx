import { Form } from 'antd'
import React, { Ref } from 'react'
import { connectField, HTMLFieldProps } from 'uniforms'
import { MonacoEditor } from '../../editors/monaco'

export type MonacoFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputRef?: Ref<HTMLTextAreaElement> }
>

export const monacoFieldFactory = (monacoProps: any) =>
  connectField<MonacoFieldProps>(
    (props) => {
      return (
        <Form.Item label={props.label ?? ''}>
          <MonacoEditor
            onChange={(e) => props.onChange(e.currentTarget.value)}
            value={props.value}
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

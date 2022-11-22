import { Form } from 'antd'
import React, { Ref } from 'react'
import { useAsync } from 'react-use'
import { connectField, Context, FieldProps, useForm } from 'uniforms'
import {
  CodeMirrorEditor,
  CodeMirrorEditorProps,
  graphqlExtensionFactory,
} from '../../codeMirror'
import { MainPropsOnChange, Value } from './CodeMirrorField'

export interface ICodeMirrorGraphqlProps<T> {
  getUrl: (context: Context<T>) => string
}

export type CodeMirrorGraphqlProps<T> = Omit<
  CodeMirrorEditorProps,
  'onChange'
> &
  Partial<MainPropsOnChange>

type CodeMirrorGraphqlConnectFieldProps<T> = FieldProps<
  Value,
  CodeMirrorGraphqlProps<T> & ICodeMirrorGraphqlProps<T>,
  {
    inputRef?: Ref<HTMLDivElement>
  }
>

export const CodeMirrorGraphqlField = <T,>(
  mainProps: CodeMirrorGraphqlProps<T>,
) => {
  const Component = React.memo(
    (baseProps: CodeMirrorGraphqlConnectFieldProps<T>) => {
      const merged = { ...mainProps, ...baseProps }
      const form = useForm<T>()
      const url = baseProps.getUrl(form)

      const { value: extension } = useAsync(
        () => graphqlExtensionFactory(url),
        [],
      )

      return (
        <Form.Item label={baseProps.label ?? ''}>
          <CodeMirrorEditor
            height="150px"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...merged}
            extensions={extension}
            value={String(merged.value || merged.field?.default)}
          />
        </Form.Item>
      )
    },
  )

  Component.displayName = 'CodeMirrorGraphqlField'

  return connectField(Component, {
    kind: 'leaf',
  })
}

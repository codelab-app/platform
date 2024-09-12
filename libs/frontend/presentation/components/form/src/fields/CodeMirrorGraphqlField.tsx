import {
  CodeMirrorEditor,
  type CodeMirrorEditorProps,
  graphqlExtensionFactory,
} from '@codelab/frontend-presentation-components-codemirror'
import { autocompletion, closeBrackets } from '@codemirror/autocomplete'
import { history } from '@codemirror/commands'
import { bracketMatching, syntaxHighlighting } from '@codemirror/language'
import { oneDark, oneDarkHighlightStyle } from '@codemirror/theme-one-dark'
import { lineNumbers } from '@codemirror/view'
import { Form, Spin } from 'antd'
import { memo, type Ref } from 'react'
import { useAsyncFn, useMount } from 'react-use'
import type { Context, FieldProps } from 'uniforms'
import { connectField, useForm } from 'uniforms'
import type { MainPropsOnChange, Value } from './CodeMirrorField'

export interface ICodeMirrorGraphqlProps<T> {
  getUrl(context: Context<T>): string
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
  const Component = memo((baseProps: CodeMirrorGraphqlConnectFieldProps<T>) => {
    const merged = { ...mainProps, ...baseProps }
    const form = useForm<T>()
    const url = baseProps.getUrl(form)
    const [state, factory] = useAsyncFn(() => graphqlExtensionFactory(url))

    useMount(factory)

    const extension = [
      bracketMatching(),
      closeBrackets(),
      history(),
      autocompletion(),
      lineNumbers(),
      oneDark,
      syntaxHighlighting(oneDarkHighlightStyle),
      state.value ?? [],
    ]

    return (
      <Form.Item label={baseProps.label ?? ''}>
        {state.loading ? (
          <Spin />
        ) : (
          <CodeMirrorEditor
            height="150px"
            {...merged}
            extensions={extension}
            overrideExtensions
            value={String(merged.value || merged.field?.default || '')}
          />
        )}
      </Form.Item>
    )
  })

  Component.displayName = 'CodeMirrorGraphqlField'

  return connectField(Component, {
    kind: 'leaf',
  })
}

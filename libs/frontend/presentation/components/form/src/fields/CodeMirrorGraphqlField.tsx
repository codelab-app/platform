'use client'

import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { Context } from 'uniforms'
import type { TextFieldProps } from 'uniforms-antd'

import {
  CodeMirrorEditor,
  graphqlExtensionFactory,
} from '@codelab/frontend-presentation-components-codemirror'
import { autocompletion, closeBrackets } from '@codemirror/autocomplete'
import { history } from '@codemirror/commands'
import { bracketMatching } from '@codemirror/language'
import { lineNumbers } from '@codemirror/view'
import { Form, Spin } from 'antd'
import { useAsyncFn, useMount } from 'react-use'
import { connectField, useForm } from 'uniforms'

export type ICodeMirrorGraphqlProps = TextFieldProps & {
  getUrl<T extends ObjectLike>(context: Context<T>): string
}

export const CodeMirrorGraphqlField = connectField<ICodeMirrorGraphqlProps>(
  (props) => {
    const form = useForm()
    const url = props.getUrl(form)
    const [state, factory] = useAsyncFn(() => graphqlExtensionFactory(url))

    useMount(factory)

    const extension = [
      bracketMatching(),
      closeBrackets(),
      history(),
      autocompletion(),
      lineNumbers(),
      state.value ?? [],
    ]

    return (
      <Form.Item label={props.label ?? ''}>
        {state.loading ? (
          <Spin />
        ) : (
          <CodeMirrorEditor
            {...props}
            extensions={extension}
            height="150px"
            overrideExtensions
            width="100%"
          />
        )}
      </Form.Item>
    )
  },
  {
    initialValue: true,
    kind: 'leaf',
  },
)

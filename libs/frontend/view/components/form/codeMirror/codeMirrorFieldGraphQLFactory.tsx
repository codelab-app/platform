import { Form } from 'antd'
import React, { Ref } from 'react'
import { connectField, HTMLFieldProps } from 'uniforms'
import { CodeMirrorGraphQLEditor } from '../../editors/graphqlEditor'
import { CodeMirrorEditorInternalProps } from '../../editors/graphqlEditor/CodeMirrorGraphQLEditorInternal'

export { CodeMirrorGraphQLEditor }

export type CodeMirrorFieldProps = Omit<
  CodeMirrorEditorInternalProps,
  'value' | 'onChange'
>
type CodeMirrorFieldRenderProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputRef?: Ref<HTMLTextAreaElement> }
>

export const codeMirrorFieldGraphQLFactory = (
  codeMirrorFieldProps: CodeMirrorFieldProps,
) =>
  connectField<CodeMirrorFieldRenderProps>(
    (props) => {
      const mergeProps = {
        ...codeMirrorFieldProps,
        ...props,
      }

      return (
        <Form.Item label={props.label ?? ''}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <CodeMirrorGraphQLEditor {...mergeProps} />
        </Form.Item>
      )
    },
    {
      kind: 'leaf',
    },
  )

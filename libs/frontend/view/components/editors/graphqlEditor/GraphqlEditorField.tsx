import { Form } from 'antd'
import dynamic from 'next/dynamic'
import { Ref } from 'react'
import { connectField, HTMLFieldProps, useField } from 'uniforms'
import type { MonacoEditorProps } from '../monaco'
import type { GraphqlEditorProps } from './GraphqlEditorInternal'

const GraphqlEditor = dynamic(() => import('./GraphqlEditorInternal'), {
  ssr: false,
})

export type GraphqlEditorFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  { inputRef?: Ref<HTMLTextAreaElement> }
>

export interface GraphqlEditorFieldFactoryInput {
  schemaUrl?: string
  schemaUrlFieldKey?: string
  editorOptions?: MonacoEditorProps['editorOptions']
}

const GraphqlEditorWithSchemaKey = ({
  schemaUrlFieldKey,
  ...props
}: Omit<GraphqlEditorProps, 'schemaUrl'> & {
  schemaUrlFieldKey: string
}) => {
  const [{ value }] = useField(schemaUrlFieldKey, {}, { absoluteName: true })

  return (
    <GraphqlEditor
      graphqlSchemaUrl={(value as string) || undefined}
      {...props}
    />
  )
}

export const graphqlEditorFieldFactory = ({
  schemaUrlFieldKey,
  schemaUrl,
  editorOptions,
}: GraphqlEditorFieldFactoryInput) => {
  return connectField<GraphqlEditorFieldProps>(
    (props) => {
      const graphqlEditorProps: Partial<GraphqlEditorProps> = {
        value: props.value,
        onChange: (val) => props.onChange(val),
        editorOptions,
      }

      if (schemaUrlFieldKey) {
        return (
          <Form.Item label={props.label} name={props.name}>
            <GraphqlEditorWithSchemaKey
              schemaUrlFieldKey={schemaUrlFieldKey}
              {...graphqlEditorProps}
            />
          </Form.Item>
        )
      }

      return (
        <Form.Item label={props.label} name={props.name}>
          <GraphqlEditor graphqlSchemaUrl={schemaUrl} {...graphqlEditorProps} />
        </Form.Item>
      )
    },
    {
      kind: 'leaf',
    },
  )
}

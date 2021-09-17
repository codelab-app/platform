import dynamic from 'next/dynamic'
import { Ref } from 'react'
import tw from 'twin.macro'
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
          <div>
            <label css={tw`py-2`}>{props.label}</label>
            <GraphqlEditorWithSchemaKey
              schemaUrlFieldKey={schemaUrlFieldKey}
              {...graphqlEditorProps}
            />
          </div>
        )
      }

      return (
        <div>
          <label css={tw`py-2`}>{props.label}</label>
          <GraphqlEditor graphqlSchemaUrl={schemaUrl} {...graphqlEditorProps} />
        </div>
      )
    },
    {
      kind: 'leaf',
    },
  )
}

import CodeMirror from 'codemirror'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import CodeMirrorGraphQLEditor, {
  CodeMirrorGraphQLEditorProps,
} from './CodeMirrorGraphQLEditor'
import { useIntrospectGraphQLSchema } from './useIntrospectGraphQL'

export type CodeMirrorEditorInternalProps = Omit<
  CodeMirrorGraphQLEditorProps,
  'onChange'
> & {
  onChange?: (value: string) => any
  containerProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  serverUrl?: string
}

/**
 * Usually you would want to use CodeMirrorGraphqlEditorInternal export from ./index, because
 * this if language is graphql will use code mirror 5 and it can't be used in SSR
 */
const CodeMirrorGraphqlEditorInternal = ({
  containerProps,
  ...props
}: CodeMirrorEditorInternalProps) => {
  const { editorOptions, serverUrl, height } = props
  const { schema } = useIntrospectGraphQLSchema(serverUrl)

  const codeMirrorProps = {
    onChange: (instance: CodeMirror.Editor) => {
      if (!props.onChange) {
        return
      }

      props.onChange(instance.getDoc().getValue())
    },
    schema,
    editorOptions,
    height,
  }

  const divStyle = {
    height: '100%',
    ...(containerProps?.style ?? {}),
  }

  return (
    <div
      style={divStyle}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(containerProps ?? {})}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <CodeMirrorGraphQLEditor {...codeMirrorProps} />
    </div>
  )
}

export { CodeMirrorGraphqlEditorInternal }
export default CodeMirrorGraphqlEditorInternal

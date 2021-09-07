import { useEffect } from 'react'
import { MonacoEditorInternal } from '../monaco/MonacoEditorInternal'
import type { MonacoEditorProps } from '../monaco/MonacoEditorProps'
import { useSchema } from './useSchema'

export interface GraphqlEditorProps extends MonacoEditorProps {
  graphqlSchemaUrl?: string
}

/**
 * Usually you would want to use GraphqlEditor export from ./index, because
 * this can't be used in SSR
 */
const GraphqlEditorInternal = ({
  graphqlSchemaUrl,
  ...props
}: GraphqlEditorProps) => {
  const { setConfig } = useSchema()
  useEffect(() => {
    setConfig({ uri: graphqlSchemaUrl ?? '' })
  }, [setConfig, graphqlSchemaUrl])

  return (
    <MonacoEditorInternal
      {...props}
      editorOptions={{ ...(props.editorOptions ?? {}), language: 'graphqlDev' }}
    />
  )
}

export { GraphqlEditorInternal }
export default GraphqlEditorInternal

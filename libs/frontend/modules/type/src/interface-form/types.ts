import { FormUniformsProps } from '@codelab/frontend/view/components'
import { TypeTree } from '@codelab/shared/core'

export interface InterfaceFormProps<TData>
  extends Omit<FormUniformsProps<TData>, 'schema'> {
  interfaceTree: TypeTree
  schema?: any
}

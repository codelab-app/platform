import { FormProps } from '@codelab/frontend/abstract/types'
import { TypeTree } from '@codelab/shared/core'
import { Assign, Overwrite } from 'utility-types'

export type InterfaceFormProps<TData> = Assign<
  FormProps<TData>,
  {
    interfaceTree: TypeTree
    schema?: any
  }
>

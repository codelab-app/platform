import { FormProps } from '@codelab/frontend/abstract/types'
import { IType } from '@codelab/shared/abstract/core'
import { TypeTree } from '@codelab/shared/core'
import { Assign } from 'utility-types'

export type InterfaceFormProps<TData> = Assign<
  FormProps<TData>,
  {
    interfaceTree: TypeTree
    schema?: any
  }
>

export type UiPropertiesFn<TType extends IType = IType> = (
  type: TType,
) => Record<string, any>

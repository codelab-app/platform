import { FormProps } from '@codelab/frontend/abstract/types'
import { IType } from '@codelab/shared/abstract/core'
import { Assign } from 'utility-types'
import { InterfaceType } from '../store'

export type InterfaceFormProps<TData> = Assign<
  Omit<FormProps<TData>, 'schema'>,
  {
    interfaceType: InterfaceType
    initialSchema?: any
  }
>

export type UiPropertiesFn<TType extends IType = IType> = (
  type: TType,
) => Record<string, any>

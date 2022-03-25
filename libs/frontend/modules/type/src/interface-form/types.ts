import { FormProps } from '@codelab/frontend/abstract/types'
import { IAnyType } from '@codelab/shared/abstract/core'
import { Assign } from 'utility-types'
import { InterfaceType } from '../store'

export type InterfaceFormProps<TData> = Assign<
  Omit<FormProps<TData>, 'schema'>,
  {
    interfaceType: InterfaceType
    initialSchema?: any
  }
>

export type UiPropertiesFn<TType extends IAnyType = IAnyType> = (
  type: TType,
) => Record<string, any>

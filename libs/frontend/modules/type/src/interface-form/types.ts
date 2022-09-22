import { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import { SetIsLoading } from '@codelab/frontend/view/components'
import {
  IAnyType,
  IInterfaceType,
  IPropData,
} from '@codelab/shared/abstract/core'
import { Assign } from 'utility-types'

export type InterfaceFormProps<TData> = Assign<
  Omit<FormProps<TData>, 'schema'>,
  {
    interfaceType: IInterfaceType
    initialSchema?: any
    setIsLoading?: SetIsLoading
    context?: UiPropertiesContext
  } & SubmitRef
>

export type UiPropertiesFn<TType extends IAnyType = IAnyType> = (
  type: TType,
) => Record<string, any>

export interface UiPropertiesContext {
  // for code mirror
  autocomplete: IPropData
}

import { FormProps } from '@codelab/frontend/abstract/types'
import { IAnyType, IInterfaceType } from '@codelab/shared/abstract/core'
import { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import { SetIsLoading } from '@codelab/frontend/view/components'
import { IAnyType } from '@codelab/shared/abstract/core'
import { Assign } from 'utility-types'

export type InterfaceFormProps<TData> = Assign<
  Omit<FormProps<TData>, 'schema'>,
  {
    interfaceType: IInterfaceType
    initialSchema?: any
    setIsLoading?: SetIsLoading
  } & SubmitRef
>

export type UiPropertiesFn<TType extends IAnyType = IAnyType> = (
  type: TType,
) => Record<string, any>

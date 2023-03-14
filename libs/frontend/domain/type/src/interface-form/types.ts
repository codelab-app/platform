import type {
  IInterfaceType,
  IPropData,
  IType,
  IValidationRules,
} from '@codelab/frontend/abstract/core'
import type { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import type { SetIsLoading } from '@codelab/frontend/view/components'
import type { Assign } from 'utility-types'

export type InterfaceFormProps<TData, TResponse> = Assign<
  Omit<FormProps<TData, TResponse>, 'schema'>,
  SubmitRef & {
    context?: UiPropertiesContext
    initialSchema?: object
    interfaceType: IInterfaceType
    setIsLoading?: SetIsLoading
  }
>

export type UiPropertiesFn<TType extends IType = IType> = (
  type: TType,
  context?: UiPropertiesContext,
) => Record<string, unknown>

/**
 * for custom parameters to typeSchema transformer
 */
export interface UiPropertiesContext {
  /**
   * used by uiProperties
   * for code mirror
   */
  autocomplete?: IPropData
  fieldName?: string | null
  validationRules?: IValidationRules
}

import type { IRuntimeContext } from '@codelab/frontend/abstract/application'
import type {
  IInterfaceTypeModel,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'
import type { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import type { SetIsLoading } from '@codelab/frontend-presentation-components-form'
import type {
  IFieldDefaultValue,
  IValidationRules,
} from '@codelab/shared/abstract/core'
import type { Assign } from 'utility-types'

export type InterfaceFormProps<TData, TResponse> = Assign<
  Omit<FormProps<TData, TResponse>, 'schema' | 'uiKey'>,
  SubmitRef & {
    context?: UiPropertiesContext
    initialSchema?: object
    interfaceType: IInterfaceTypeModel
    setIsLoading?: SetIsLoading
  }
>

export type UiPropertiesFn<TType extends ITypeModel = ITypeModel> = (
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
  autocomplete?: IRuntimeContext
  defaultValues?: IFieldDefaultValue | null
  // elementService: IElementService
  fieldName?: string | null
  validationRules?: IValidationRules
}

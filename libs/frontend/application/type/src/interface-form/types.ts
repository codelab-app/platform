import type { IEvaluationContext } from '@codelab/frontend/abstract/application'
import type {
  IFieldDefaultValue,
  IInterfaceTypeModel,
  ITypeModel,
  IValidationRules,
} from '@codelab/frontend/abstract/domain'
import type { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import type { SetIsLoading } from '@codelab/frontend/presentation/view'
import type { Assign } from 'utility-types'

export type InterfaceFormProps<TData, TResponse> = Assign<
  Omit<FormProps<TData, TResponse>, 'schema'>,
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
  autocomplete?: IEvaluationContext
  defaultValues?: IFieldDefaultValue | null
  fieldName?: string | null
  validationRules?: IValidationRules
}

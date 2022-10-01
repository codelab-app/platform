import { ILambdaType } from '@codelab/shared/abstract/core'
import { SelectLambda } from '../fields'
import { UiPropertiesFn } from '../types'

export const lambdaTypeUiProperties: UiPropertiesFn<ILambdaType> = () => {
  return { uniforms: { component: SelectLambda } }
}

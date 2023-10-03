import type { ILambdaType } from '@codelab/frontend/abstract/core'
import { SelectLambda } from '../fields'
import type { UiPropertiesFn } from '../types'

export const lambdaTypeUiProperties: UiPropertiesFn<ILambdaType> = () => {
  return { uniforms: { component: SelectLambda } }
}

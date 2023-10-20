import type { ILambdaTypeModel } from '@codelab/frontend/abstract/domain'
import { SelectLambda } from '../fields'
import type { UiPropertiesFn } from '../types'

export const lambdaTypeUiProperties: UiPropertiesFn<ILambdaTypeModel> = () => {
  return { uniforms: { component: SelectLambda } }
}

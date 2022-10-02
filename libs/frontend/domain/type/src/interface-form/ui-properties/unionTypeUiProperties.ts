import { IUnionType } from '@codelab/frontend/abstract/core'
import { SelectUnionTypeValue } from '../fields/select-union-type-value/SelectUnionTypeValue'
import { UiPropertiesFn } from '../types'

export const unionTypeUiProperties: UiPropertiesFn<IUnionType> = () => {
  return { uniforms: { component: SelectUnionTypeValue } }
}

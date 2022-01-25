import { IUnionType } from '@codelab/shared/abstract/core'
import { SelectUnionTypeValue } from '../fields/select-union-type-value/SelectUnionTypeValue'
import { UiPropertiesFn } from '../types'

export const unionTypeUiProperties: UiPropertiesFn<IUnionType> = () => {
  return { uniforms: { component: SelectUnionTypeValue } }
}

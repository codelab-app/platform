import type { IUnionType } from '@codelab/frontend/abstract/domain'
import { SelectUnionTypeValue } from '../fields/select-union-type-value/SelectUnionTypeValue'
import type { UiPropertiesFn } from '../types'

export const unionTypeUiProperties: UiPropertiesFn<IUnionType> = () => {
  return { uniforms: { component: SelectUnionTypeValue } }
}

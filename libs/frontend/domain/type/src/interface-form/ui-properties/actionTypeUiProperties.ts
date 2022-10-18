import { IAnyActionType } from '@codelab/frontend/abstract/core'
import { SelectAction } from '../fields'
import { UiPropertiesFn } from '../types'

export const actionTypeUiProperties: UiPropertiesFn<IAnyActionType> = () => {
  return { uniforms: { component: SelectAction } }
}

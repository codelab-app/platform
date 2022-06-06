import { IActionType } from '@codelab/shared/abstract/core'
import { SelectAction } from '../fields'
import { UiPropertiesFn } from '../types'

export const actionTypeUiProperties: UiPropertiesFn<IActionType> = () => {
  return { uniforms: { component: () => SelectAction } }
}

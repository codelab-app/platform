import { IAppType } from '@codelab/frontend/abstract/core'
import { SelectApp } from '../fields'
import { UiPropertiesFn } from '../types'

export const appTypeUiProperties: UiPropertiesFn<IAppType> = () => {
  return { uniforms: { component: SelectApp } }
}

import type { IAppType } from '@codelab/frontend/abstract/domain'
import { SelectApp } from '../fields'
import type { UiPropertiesFn } from '../types'

export const appTypeUiProperties: UiPropertiesFn<IAppType> = () => {
  return { uniforms: { component: SelectApp } }
}

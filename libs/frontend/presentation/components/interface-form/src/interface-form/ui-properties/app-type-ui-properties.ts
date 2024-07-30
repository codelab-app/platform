import type { IAppTypeModel } from '@codelab/frontend/abstract/domain'
import { SelectApp } from '../fields'
import type { UiPropertiesFn } from '../types'

export const appTypeUiProperties: UiPropertiesFn<IAppTypeModel> = () => {
  return { uniforms: { component: SelectApp } }
}

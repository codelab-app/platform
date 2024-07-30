import type { IPageTypeModel } from '@codelab/frontend/abstract/domain'
import { SelectPage } from '../fields'
import type { UiPropertiesFn } from '../types'

export const pageTypeUiProperties: UiPropertiesFn<IPageTypeModel> = () => {
  return { uniforms: { component: SelectPage } }
}

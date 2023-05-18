import type { IPageType } from '@codelab/frontend/abstract/core'
import { SelectPage } from '../fields'
import type { UiPropertiesFn } from '../types'

export const pageTypeUiProperties: UiPropertiesFn<IPageType> = () => {
  return { uniforms: { component: SelectPage } }
}

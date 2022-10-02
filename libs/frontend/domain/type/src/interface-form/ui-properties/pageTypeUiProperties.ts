import { IPageType } from '@codelab/frontend/abstract/core'
import { SelectPage } from '../fields'
import { UiPropertiesFn } from '../types'

export const pageTypeUiProperties: UiPropertiesFn<IPageType> = () => {
  return { uniforms: { component: SelectPage } }
}

import type { IElementType } from '@codelab/frontend/abstract/domain'
import { getSelectElementComponent } from '../fields'
import type { UiPropertiesFn } from '../types'

export const elementTypeUiProperties: UiPropertiesFn<IElementType> = (type) => {
  return {
    uniforms: {
      component: getSelectElementComponent((type as IElementType).elementKind),
    },
  }
}

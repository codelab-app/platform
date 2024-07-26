import type { IElementTypeModel } from '@codelab/frontend/abstract/domain'
import { getSelectElementComponent } from '../fields'
import type { UiPropertiesFn } from '../types'

export const elementTypeUiProperties: UiPropertiesFn<IElementTypeModel> = (
  type,
) => {
  return {
    uniforms: {
      component: getSelectElementComponent(
        (type as IElementTypeModel).elementKind,
      ),
    },
  }
}

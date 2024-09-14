import type { IElementTypeModel } from '@codelab/frontend/abstract/domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend/abstract/types'
import { getSelectElementComponent } from '../fields'

export const elementTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IElementTypeModel
> = (type, autocomplete) => {
  return {
    uniforms: {
      component: getSelectElementComponent(type.elementKind),
    },
  }
}

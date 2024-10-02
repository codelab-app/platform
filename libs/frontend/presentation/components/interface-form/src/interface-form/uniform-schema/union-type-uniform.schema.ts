import type { IUnionTypeModel } from '@codelab/frontend/abstract/domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend/abstract/types'

import { SelectUnionTypeValue } from '../fields'

export const unionTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IUnionTypeModel
> = (type, autocomplete) => {
  return {
    uniforms: {
      component: SelectUnionTypeValue,
    },
  }
}

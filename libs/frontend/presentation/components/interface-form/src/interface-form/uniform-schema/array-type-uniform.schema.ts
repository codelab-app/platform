import type { IArrayTypeModel } from '@codelab/frontend-abstract-domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend-abstract-types'

import { ExpressionListField } from '@codelab/frontend-presentation-components-form'

export const arrayTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IArrayTypeModel
> = (type, autocomplete) => {
  return {
    uniforms: {
      component: ExpressionListField,
    },
  }
}

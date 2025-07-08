import type { IPrimitiveTypeModel } from '@codelab/frontend-abstract-domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend-abstract-types'
import { ExpressionAutoField } from '@codelab/frontend-presentation-components-form'

export const primitiveTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IPrimitiveTypeModel
> = (type, autocomplete) => {
  return {
    uniforms: {
      component: ExpressionAutoField,
    },
  }
}

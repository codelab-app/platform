import type { IPrimitiveTypeModel } from '@codelab/frontend-abstract-domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend-abstract-types'

export const primitiveTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IPrimitiveTypeModel
> = (type, autocomplete) => {
  return {}
}

import type { IArrayTypeModel } from '@codelab/frontend-abstract-domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend-abstract-types'

export const arrayTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IArrayTypeModel
> = (type, autocomplete) => {
  return {
    uniforms: {},
  }
}

import type { IEnumTypeModel } from '@codelab/frontend-abstract-domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend-abstract-types'

export const enumTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IEnumTypeModel
> = (type, autocomplete) => {
  return {
    enum: type.allowedValues.map((allowedValue) => allowedValue.value),
    uniforms: {
      showSearch: true,
    },
  }
}

import type { IElementTypeModel } from '@codelab/frontend-abstract-domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend-abstract-types'

import { ExpressionListField } from '@codelab/frontend-presentation-components-form'

export const elementTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IElementTypeModel
> = (type, autocomplete) => {
  return { uniforms: { component: ExpressionListField } }
}

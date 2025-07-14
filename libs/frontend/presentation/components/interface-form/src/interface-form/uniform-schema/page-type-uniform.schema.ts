import type { IPageTypeModel } from '@codelab/frontend-abstract-domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend-abstract-types'

import { ExpressionListField } from '@codelab/frontend-presentation-components-form'

export const pageTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IPageTypeModel
> = (type, autocomplete) => {
  return { uniforms: { component: ExpressionListField } }
}

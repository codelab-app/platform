import type { IAppTypeModel } from '@codelab/frontend-abstract-domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend-abstract-types'

import { ExpressionSelectField } from '@codelab/frontend-presentation-components-form'

export const appTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IAppTypeModel
> = (type, autocomplete) => {
  return { uniforms: { component: ExpressionSelectField } }
}

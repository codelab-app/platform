import type { IPageTypeModel } from '@codelab/frontend/abstract/domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend/abstract/types'

import { SelectPage } from '../fields'

export const pageTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IPageTypeModel
> = (type, autocomplete) => {
  return { uniforms: { component: SelectPage } }
}

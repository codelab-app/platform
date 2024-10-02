import type { IAppTypeModel } from '@codelab/frontend/abstract/domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend/abstract/types'

import { SelectApp } from '../fields'

export const appTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IAppTypeModel
> = (type, autocomplete) => {
  return { uniforms: { component: SelectApp } }
}

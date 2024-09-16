import type { ILambdaTypeModel } from '@codelab/frontend/abstract/domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend/abstract/types'
import { SelectLambda } from '../fields'

export const lambdaTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  ILambdaTypeModel
> = (type, autocomplete) => {
  return { uniforms: { component: SelectLambda } }
}

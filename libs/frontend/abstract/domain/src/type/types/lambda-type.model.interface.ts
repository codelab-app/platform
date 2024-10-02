import type { ILambdaTypeDto, ITypeKind } from '@codelab/shared/abstract/core'
import type {
  LambdaTypeCreateInput,
  UpdateLambdaTypesMutationVariables,
} from '@codelab/shared/infra/gql'

import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Allows picking a lambda
 */
export interface ILambdaTypeModel
  extends IBaseTypeModel<
    ILambdaTypeDto,
    LambdaTypeCreateInput,
    UpdateLambdaTypesMutationVariables
  > {
  kind: ITypeKind.LambdaType
}

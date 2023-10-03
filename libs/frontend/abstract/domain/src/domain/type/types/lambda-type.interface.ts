import type {
  LambdaTypeCreateInput,
  UpdateLambdaTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { ILambdaTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from './base-type.interface'

/**
 * Allows picking a lambda
 */
export interface ILambdaType
  extends IBaseType<
    ILambdaTypeDTO,
    LambdaTypeCreateInput,
    UpdateLambdaTypesMutationVariables
  > {
  kind: ITypeKind.LambdaType
}

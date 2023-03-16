import type {
  LambdaTypeCreateInput,
  UpdateLambdaTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'
import type { ILambdaTypeDTO } from './lambda-type.dto.interface'

/**
 * Allows picking a lambda
 */
export interface ILambdaType
  extends Omit<
    IBaseType<
      ILambdaTypeDTO,
      LambdaTypeCreateInput,
      UpdateLambdaTypesMutationVariables,
      void
    >,
    'toDeleteInput'
  > {
  kind: ITypeKind.LambdaType
}

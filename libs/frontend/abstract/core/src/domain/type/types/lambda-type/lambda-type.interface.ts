import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'

/**
 * Allows picking a lambda
 */
export interface ILambdaType extends IBaseType {
  kind: ITypeKind.LambdaType
}

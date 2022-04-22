import { IBaseType } from '../base-type/base-type.interface'
import { ITypeKind } from '../base-type/type-kind.enum'

/**
 * Allows picking a lambda
 */
export interface ILambdaType extends IBaseType {
  kind: ITypeKind.LambdaType
}

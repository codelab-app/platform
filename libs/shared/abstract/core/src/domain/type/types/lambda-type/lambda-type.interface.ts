import { IBaseType } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

/**
 * Allows picking a lambda
 */
export interface ILambdaType extends IBaseType {
  typeKind: typeof TypeKind.LambdaType
}

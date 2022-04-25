import { IBaseType } from '../base-type/base-type.interface'
import { ITypeKind } from '../base-type/type-kind.enum'
import { IPrimitiveTypeKind } from './primitive-type.enum'

/**
 * Base atomic building block of the type system.
 * Represents primitive types - String, Integer, Float, Boolean
 *
 * @property {PrimitiveTypeKind} primitiveKind - concrete primitive kind
 */
export interface IPrimitiveType extends IBaseType {
  kind: ITypeKind.PrimitiveType
  primitiveKind: IPrimitiveTypeKind
}

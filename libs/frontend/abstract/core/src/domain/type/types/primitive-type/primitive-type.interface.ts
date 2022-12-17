import type {
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'

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

import type {
  IPrimitiveTypeDto,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared-abstract-core'

import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Base atomic building block of the type system.
 * Represents primitive types - String, Integer, Float, Boolean
 *
 * @property {PrimitiveTypeKind} primitiveKind - concrete primitive kind
 */
export interface IPrimitiveTypeModel extends IBaseTypeModel<IPrimitiveTypeDto> {
  kind: ITypeKind.PrimitiveType
  primitiveKind: IPrimitiveTypeKind
}

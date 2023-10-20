import type {
  PrimitiveTypeCreateInput,
  UpdatePrimitiveTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type {
  IPrimitiveTypeDTO,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Base atomic building block of the type system.
 * Represents primitive types - String, Integer, Float, Boolean
 *
 * @property {PrimitiveTypeKind} primitiveKind - concrete primitive kind
 */
export interface IPrimitiveTypeModel
  extends IBaseTypeModel<
    IPrimitiveTypeDTO,
    PrimitiveTypeCreateInput,
    UpdatePrimitiveTypesMutationVariables
  > {
  kind: ITypeKind.PrimitiveType
  primitiveKind: IPrimitiveTypeKind
}

import type {
  PrimitiveTypeCreateInput,
  UpdatePrimitiveTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type {
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'
import type { IPrimitiveTypeDTO } from './primitive-type.dto.interface'

/**
 * Base atomic building block of the type system.
 * Represents primitive types - String, Integer, Float, Boolean
 *
 * @property {PrimitiveTypeKind} primitiveKind - concrete primitive kind
 */
export interface IPrimitiveType
  extends IBaseType<
    IPrimitiveTypeDTO,
    PrimitiveTypeCreateInput,
    UpdatePrimitiveTypesMutationVariables
  > {
  kind: ITypeKind.PrimitiveType
  primitiveKind: IPrimitiveTypeKind
}

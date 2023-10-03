import type {
  ArrayTypeCreateInput,
  UpdateArrayTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { IArrayTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IBaseType, IType } from './base-type.interface'

/**
 * Allows defining a variable number of items of a given type.
 *
 * @property itemType - reference to the type of items in the array
 */
export interface IArrayType
  extends IBaseType<
    IArrayTypeDTO,
    ArrayTypeCreateInput,
    UpdateArrayTypesMutationVariables
  > {
  itemType?: Ref<IType> | null
  kind: ITypeKind.ArrayType
}

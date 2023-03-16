import type {
  ArrayTypeCreateInput,
  UpdateArrayTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IBaseType } from '../base-type'
import type { IType } from '../type.interface'
import type { IArrayTypeDTO } from './array-type.dto.interface'

/**
 * Allows defining a variable number of items of a given type.
 *
 * @property itemType - reference to the type of items in the array
 */
export interface IArrayType extends IBaseType<IArrayTypeDTO> {
  itemType?: Ref<IType> | null
  kind: ITypeKind.ArrayType

  toCreateInput(): ArrayTypeCreateInput
  toUpdateInput(): UpdateArrayTypesMutationVariables
}

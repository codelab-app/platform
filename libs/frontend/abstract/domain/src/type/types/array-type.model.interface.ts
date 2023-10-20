import type {
  ArrayTypeCreateInput,
  UpdateArrayTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { IArrayTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IBaseTypeModel, ITypeModel } from './base-type.model.interface'

/**
 * Allows defining a variable number of items of a given type.
 *
 * @property itemType - reference to the type of items in the array
 */
export interface IArrayTypeModel
  extends IBaseTypeModel<
    IArrayTypeDTO,
    ArrayTypeCreateInput,
    UpdateArrayTypesMutationVariables
  > {
  itemType?: Ref<ITypeModel> | null
  kind: ITypeKind.ArrayType
}

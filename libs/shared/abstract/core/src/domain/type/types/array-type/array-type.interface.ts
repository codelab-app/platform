import { Ref } from 'mobx-keystone'
import { IBaseType } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'
import type { IAnyType } from '../type.interface'

/**
 * Allows defining a variable number of items of a given type.
 *
 * @property itemType - reference to the type of items in the array
 */
export interface IArrayType extends IBaseType {
  typeKind: typeof TypeKind.ArrayType
  itemType: Ref<IAnyType>
}

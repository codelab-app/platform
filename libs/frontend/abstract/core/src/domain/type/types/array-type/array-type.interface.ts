import { ITypeKind } from '@codelab/shared/abstract/core'
import { IBaseType } from '../base-type'

/**
 * Allows defining a variable number of items of a given type.
 *
 * @property itemType - reference to the type of items in the array
 */
export interface IArrayType extends IBaseType {
  kind: ITypeKind.ArrayType
  itemType: { id: string; name: string }
}

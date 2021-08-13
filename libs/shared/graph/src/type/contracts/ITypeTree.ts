import { TypeKind } from '@codelab/ddd/types'
import { IFieldVertex } from './IFieldVertex'
import { ITypeVertex } from './ITypeVertex'

export interface ITypeTree {
  /** Returns all the root fields in the tree, or an empty array if none */
  getRootFields: () => Array<IFieldVertex>

  /** Returns the type of the field or null if the field is not found */
  getFieldType: (fieldId: string) => ITypeVertex | null

  /** Returns a type by id or null if not found */
  getType: (typeId: string) => ITypeVertex | null

  /** Returns the item type of an array or null if not found */
  getArrayItemType: (arrayTypeId: string) => ITypeVertex | null

  /** Returns all the fields of a type. Returns an empty array if the type doesn't have any fields (i.e. if it's not an interface) */
  getFieldsOf: (typeId: string) => Array<IFieldVertex>

  /** Returns all types, or all types by typeKind if provided */
  getTypes: (typeKind?: TypeKind) => Array<ITypeVertex>

  /** Returns the kind of the type or null if it's not found by id */
  getTypeKind: (typeOrId: ITypeVertex | string) => TypeKind | null
}

import {
  __FieldFragment,
  __TypeFragment,
} from '@codelab/shared/codegen/graphql'

export interface TypeTree {
  /** Returns all the root fields in the tree, or an empty array if none */
  getRootFields: () => Array<__FieldFragment>

  /** Returns the type of the field or null if the field is not found */
  getFieldType: (fieldId: string) => __TypeFragment | null

  /** Returns a type by id or null if not found */
  getType: (typeId: string) => __TypeFragment | null

  /** Returns the item type of an array or null if not found */
  getArrayItemType: (arrayTypeId: string) => __TypeFragment | null

  /** Returns all the fields of a type. Returns an empty array if the type doesn't have any fields (i.e. if it's not an interface) */
  getFieldsOf: (typeId: string) => Array<__FieldFragment>
}

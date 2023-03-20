import type {
  IAtomDTO,
  IFieldDTO,
  IInterfaceTypeDTO,
  ITagDTO,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'

/**
 * When we export data, we should keep a file for each atom, this way it makes it easier to look at diff.
 *
 * Each atoms should also contain the interface type within the same file, along with any other referenced types & referenced tags.
 *
 * We should make it such that an atom can only reference types that belong to it. This way we make each atom more isolated.
 *
 * However, we still need to export all tags to a single file, since this contains the tag tree relationship
 *
 * We should also export system types such as primitive to a single file, since these are unchanged.
 */

/**
 * This is the final complete data that is passed into our import function
 */
export interface IAdminDataExport {
  apis: Array<IInterfaceTypeDTO>
  atoms: Array<IAtomDTO>
  fields: Array<IFieldDTO>
  // resources: Array<IResourceExport>
  tags: Array<ITagDTO>
  // Import api separately
  types: Array<ITypeDTO>
}

import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IAtomBoundedContext } from './atom.bounded-context.interface'
import { IComponentBoundedContext } from './component.bounded-context.interface'
import { ITag } from './tag.dto.interface'
import { IType } from './type'

/**
 * When we export data, we should keep a file for each atom, this way it makes it easier to look at diff.
 *
 * Each atoms should also contain the interface type within the same file, along with any other referenced types & referenced tags.
 *
 * We should make it such that an atom can only reference types that belong to it. This way we make each atom more isolated.
 *
 * However, we still need to export all tags to a single file, since this contains the tag tree relationship
 *
 * We should also export system types such as primitive to a single file, since these are unchanged .
 */

/**
 * This is the final complete data that is passed into our import function
 */
export const IAdminBoundedContext = Type.Object({
  atoms: Type.Array(IAtomBoundedContext),
  components: Type.Array(IComponentBoundedContext),
  // resources: Array<IResourceOutputDto>
  systemTypes: Type.Array(IType),
  tags: Type.Array(ITag),
})

export type IAdminBoundedContext = Static<typeof IAdminBoundedContext>

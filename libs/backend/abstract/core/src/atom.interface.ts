import { IAtomType } from '@codelab/shared/abstract/core'
import { EntitySchema } from '@codelab/shared/abstract/types'
import type { Assign } from 'utility-types'
import { z } from 'zod'
import type { ExistingData } from './seed'
import { OwnerSchema, UserRefSchema } from './user.interface'

// export interface IAtomExport {
//   icon?: string | null
//   id: string
//   name: string
//   type: IAtomType
//   api: {
//     id: string
//     /**
//      * Used for composite key lookup (along with field key), we can't depend on ID since it may be outdated
//      */
//     name: string
//   }
//   tags: Array<ITag>
//   allowedChildren: Array<{
//     id: string
//     // Used for sorting export data
//     name: string
//   }>
// }

/**
 * Shape it needs to be for import
 */
export type IAtomImport = Assign<
  IAtomExport,
  /**
   * AllowedChildren requires all atoms to be seeded first, so we defer instantiation till data is ready
   *
   * This function takes in existing data and return data for upsert
   */
  {
    allowedChildren: (data: ExistingData) => IAtomExport['allowedChildren']
  }
>

export interface ImportAtoms {
  atoms: Array<IAtom>
  userId: string
  // atomWhere: BaseUniqueWhereCallback<IAtomImport>
  // tagWhere: BaseUniqueWhereCallback<ITag>
}

export const AtomSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().optional().nullable(),
  type: z.nativeEnum(IAtomType),
  api: EntitySchema,
  tags: z.array(EntitySchema),
  allowedChildren: z
    .array(
      z.object({
        id: z.string(),
      }),
    )
    .optional(),
  owner: UserRefSchema,
})

export const AtomExportSchema = AtomSchema.merge(
  z.object({
    allowedChildren: z.array(EntitySchema),
    api: EntitySchema,
    tags: z.array(EntitySchema),
  }),
)

export type IAtomExport = z.infer<typeof AtomExportSchema>

export type IAtom = z.infer<typeof AtomSchema>

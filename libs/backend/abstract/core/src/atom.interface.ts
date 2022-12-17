import type { IAtomType } from '@codelab/shared/abstract/core'
import type { BaseUniqueWhereCallback } from '@codelab/shared/abstract/types'
import type { Assign } from 'utility-types'
import type { ExistingData } from './seed'
import type { ITagExport } from './tag.interface'

export interface IAtomExport {
  icon?: string | null
  id: string
  name: string
  type: IAtomType
  api: {
    id: string
    /**
     * Used for composite key lookup (along with field key), we can't depend on ID since it may be outdated
     */
    name: string
  }
  tags: Array<ITagExport>
  allowedChildren: Array<{
    id: string
    // Used for sorting export data
    name: string
  }>
}

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
  atoms: Array<IAtomImport>
  userId: string
  atomWhere: BaseUniqueWhereCallback<IAtomImport>
  tagWhere: BaseUniqueWhereCallback<ITagExport>
}

import { BaseUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { Assign } from 'utility-types'
import { IAtomType } from '../domain/atom'
import { ExistingData } from './seed'
import { ITagExport } from './tag.interface'

export interface IAtomExport {
  icon?: string | null
  id: string
  name: string
  type: IAtomType
  api: {
    id: string
  }
  tags: Array<ITagExport>
  allowedChildren: Array<{
    id: string
    // Used for lookup since ID may be out of sync
    // type: string
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

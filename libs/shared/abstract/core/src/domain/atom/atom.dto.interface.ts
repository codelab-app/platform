import { ITagExport, ITagRef } from '../tag'
import { IInterfaceTypeRef } from '../type'
import { IAuth0Id } from '../user'
import { AtomFragment, AtomPreviewFragment } from './atom.fragment.graphql.gen'
import { IAtomType } from './atom-type.enum'

export interface ICreateAtomDTO {
  /**
   * Optional string to override auto-generated id
   */
  id?: string
  name: string
  type: IAtomType
  tags?: Array<ITagRef>
  // Used for interface
  owner: IAuth0Id

  // Allow for connection to existing interface
  api?: IInterfaceTypeRef | undefined
}

export type IUpdateAtomDTO = Omit<ICreateAtomDTO, 'owner'>

export type IAtomDTO = AtomFragment

export type IAtomPreviewDTO = AtomPreviewFragment

export interface IAtomExport {
  icon?: string | null
  id: string
  name: string
  type: IAtomType
  api: {
    id: string
  }
  tags: Array<ITagExport>
}

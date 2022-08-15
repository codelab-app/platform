import { Tag } from '@codelab/shared/abstract/codegen'
import { ITagRef } from '../tag'
import { IInterfaceTypeRef } from '../type'
import { IAuth0Id } from '../user'
import { AtomFragment } from './atom.fragment.graphql.gen'
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

export type IAtomExport = {
  icon?: string
  id: string
  name: string
  type: IAtomType
  api?: {
    id: string | undefined
  }
  tags?: Array<Tag>
}

// export type IAtomExport = Pick<OGM_TYPES.Atom, 'id' | 'name' | 'type' | 'api'>

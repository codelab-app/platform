import { ITagRef } from '../tag'
import { IInterfaceTypeRef } from '../type'
import { IAuth0Id } from '../user'
import { AtomFragment, RenderAtomFragment } from './atom.fragment.graphql.gen'
import type { IAtomRef } from './atom.model.interface'
import { IAtomType } from '../../../../../../shared/abstract/core/src/atom-type.enum'

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
  allowedChildren?: Array<IAtomRef>
}

export type IUpdateAtomDTO = Omit<ICreateAtomDTO, 'owner'>

export type IAtomDTO = AtomFragment

export type IRenderAtomDTO = RenderAtomFragment

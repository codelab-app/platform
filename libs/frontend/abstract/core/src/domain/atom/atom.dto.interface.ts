import type { IAtomType } from '@codelab/shared/abstract/core'
import type { ITagDTO, ITagRef } from '../tag'
import type { IInterfaceTypeDTO, IInterfaceTypeRef } from '../type'
import type { IAuth0Owner } from '../user'
import type {
  AtomFragment,
  RenderAtomFragment,
} from './atom.fragment.graphql.gen'
import type { IAtomRef } from './atom.model.interface'

export interface ICreateAtomDTO {
  /**
   * Optional string to override auto-generated id
   */
  id: string
  name: string
  type: IAtomType
  tags?: Array<ITagRef>
  // Used for interface
  owner: IAuth0Owner

  // Allow for connection to existing interface
  api?: IInterfaceTypeRef | undefined
  allowedChildren?: Array<IAtomRef>
}

export type IUpdateAtomDTO = Omit<ICreateAtomDTO, 'owner'>

export interface IAtomDTO {
  id: string
  name: string
  type: IAtomType
  icon?: string | null
  tags: Array<ITagDTO>
  api: IInterfaceTypeDTO
  allowedChildren: Array<Pick<IAtomDTO, 'id' | 'name' | 'type'>>
}

export type IRenderAtomDTO = RenderAtomFragment

export type IAtomID = string

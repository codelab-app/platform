import type { IAtomType } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { ITagDTO, ITagRef } from '../tag'
import type { IInterfaceTypeDTO, IInterfaceTypeRef } from '../type'
import type { IAuth0Owner } from '../user'
import type {
  AtomFragment,
  RenderAtomFragment,
} from './atom.fragment.graphql.gen'
import type { IAtomRef } from './atom.model.interface'

export interface ICreateAtomData {
  id: string
  name: string
  type: IAtomType
  tags?: Array<IEntity>
  // Used for interface
  owner: IAuth0Owner

  // Allow for connection to existing interface
  // api: IEntity
  allowedChildren?: Array<IAtomRef>
}

export type IUpdateAtomData = Omit<ICreateAtomData, 'owner'>

export interface IAtomDTO {
  id: string
  name: string
  type: IAtomType
  owner: IAuth0Owner
  icon?: string | null
  tags?: Array<IEntity>
  api: IEntity
  allowedChildren?: Array<IEntity>
}

export type IRenderAtomDTO = RenderAtomFragment

export type IAtomID = string

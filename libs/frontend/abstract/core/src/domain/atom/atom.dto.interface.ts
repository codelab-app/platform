import type { IAtomType } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IOwnerSchema } from '../user'
import type { RenderAtomFragment } from './atom.fragment.graphql.gen'
import type { IAtomRef } from './atom.model.interface'

export interface ICreateAtomData extends IOwnerSchema {
  // Used for interface
  // Allow for connection to existing interface
  // api: IEntity
  id: string
  name: string
  requiredParents?: Array<IAtomRef>
  suggestedChildren?: Array<IAtomRef>
  tags?: Array<IEntity>
  type: IAtomType
}

export type IUpdateAtomData = Omit<ICreateAtomData, 'owner'>

export interface IAtomDTO extends IOwnerSchema {
  api: IEntity
  icon?: string | null
  id: string
  name: string
  requiredParents?: Array<IEntity>
  suggestedChildren?: Array<IEntity>
  tags?: Array<IEntity>
  type: IAtomType
}

export type IRenderAtomDTO = RenderAtomFragment

export type IAtomID = string

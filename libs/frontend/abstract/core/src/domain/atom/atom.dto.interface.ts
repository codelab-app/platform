import type { IAtomType } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IOwnerSchema } from '../user'
import type { RenderAtomFragment } from './atom.fragment.graphql.gen'
import type { IAtomRef } from './atom.model.interface'

export interface ICreateAtomData extends IOwnerSchema {
  id: string
  name: string
  type: IAtomType
  tags?: Array<IEntity>
  // Used for interface

  // Allow for connection to existing interface
  // api: IEntity
  allowedChildren?: Array<IAtomRef>
}

export type IUpdateAtomData = Omit<ICreateAtomData, 'owner'>

export interface IAtomDTO extends IOwnerSchema {
  id: string
  name: string
  type: IAtomType
  icon?: string | null
  tags?: Array<IEntity>
  api: IEntity
  allowedChildren?: Array<IEntity>
}

export type IRenderAtomDTO = RenderAtomFragment

export type IAtomID = string

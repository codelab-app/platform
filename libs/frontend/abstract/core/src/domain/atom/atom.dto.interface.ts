import type { IAtomType, IOwner } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { RenderAtomFragment } from './atom.fragment.graphql.gen'
import type { IAtomRef } from './atom.model.interface'

export interface ICreateAtomData extends IOwner {
  // Used for interface
  // Allow for connection to existing interface
  // api: IEntity
  externalCssSource?: string | null
  externalJsSource?: string | null
  externalSourceType?: string | null
  id: string
  name: string
  requiredParents?: Array<IAtomRef>
  suggestedChildren?: Array<IAtomRef>
  tags?: Array<IEntity>
  type: IAtomType
}

export type IUpdateAtomData = Omit<ICreateAtomData, 'owner'>

export type IRenderAtomDTO = RenderAtomFragment

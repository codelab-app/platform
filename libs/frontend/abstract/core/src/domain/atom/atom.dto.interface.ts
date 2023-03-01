import type { IAtomType } from '@codelab/shared/abstract/core'
import type { ITagRef } from '../tag'
import type { IInterfaceTypeRef } from '../type'
import type { IAuth0Id } from '../user'
import type {
  AtomFragment,
  RenderAtomFragment,
} from './atom.fragment.graphql.gen'
import type { IAtomRef } from './atom.model.interface'

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
  suggestedChildren?: Array<IAtomRef>
  requiredParents?: Array<IAtomRef>
}

export type IUpdateAtomDTO = Omit<ICreateAtomDTO, 'owner'>

export type IAtomDTO = AtomFragment

export type IRenderAtomDTO = RenderAtomFragment

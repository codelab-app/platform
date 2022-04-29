import { Nullish } from '@codelab/shared/abstract/types'
import { ITagRef } from '../tag'
import { IAuth0ID } from '../user'
import { AtomFragment } from './atom.fragment.graphql.gen'
import { IAtomType } from './atom-type.enum'

export interface ICreateAtomDTO {
  name: string
  type: IAtomType
  tags?: Nullish<Array<ITagRef>>
  owner: IAuth0ID
}

export type IUpdateAtomDTO = Omit<ICreateAtomDTO, 'owner'>

export type IAtomDTO = AtomFragment

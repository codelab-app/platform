import { Nullish } from '@codelab/shared/abstract/types'
import { AtomFragment } from './atom.fragment.graphql.gen'
import { AtomType } from './atom-type.enum'

export interface ICreateAtomDTO {
  name: string
  type: AtomType
  tags: Nullish<Array<string>>
}

export type IUpdateAtomDTO = ICreateAtomDTO

export type IAtomDTO = AtomFragment

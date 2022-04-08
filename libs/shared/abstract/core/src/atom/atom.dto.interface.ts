import { Nullish } from '@codelab/shared/abstract/types'
import { AtomType } from './atom-type.enum'

export interface ICreateAtomDTO {
  name: string
  type: AtomType
  tags: Nullish<Array<string>>
}

export type IUpdateAtomDTO = ICreateAtomDTO

import { IEntity, Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ITag } from '../tag'
import { IAnyType } from '../type'
import { IAtomDTO } from './atom.dto.interface'
import { IAtomType } from './atom-type.enum'

export interface IAtom extends IEntity {
  name: string
  icon?: string | null
  type: IAtomType
  tags: Array<Ref<ITag>>
  api: Ref<IAnyType>
  allowCustomTextInjection: boolean
  updateCache(atom: any): void
}

export type IAtomRef = string

export const isAtomDTO = (atom: Nullish<IAtomDTO>): atom is IAtomDTO => {
  return atom !== undefined && atom !== null
}

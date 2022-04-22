import { IEntity, Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ITag } from '../tag'
import { IInterfaceType } from '../type'
import { IAtomDTO } from './atom.dto.interface'
import { AtomType } from './atom-type.enum'

export interface IAtom extends IEntity {
  name: string
  type: AtomType
  tags: Array<ITag>
  api: Ref<IInterfaceType>
  updateCache(atom: any): void
}

export const isAtomDTO = (atom: Nullish<IAtomDTO>): atom is IAtomDTO => {
  return atom !== undefined && atom !== null
}

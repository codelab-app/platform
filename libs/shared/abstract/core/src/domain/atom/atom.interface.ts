import { IEntity, Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ITag } from '../tag'
import { IAnyType, IInterfaceType } from '../type'
import { IAtomDTO } from './atom.dto.interface'
import { IAtomType } from './atom-type.enum'

export interface IAtom extends IEntity {
  name: string
  type: IAtomType
  tags: Array<Ref<ITag>>
  _api: Ref<IAnyType>
  api: IInterfaceType
  updateCache(atom: any): void
}

export type IAtomRef = string

export const isAtomDTO = (atom: Nullish<IAtomDTO>): atom is IAtomDTO => {
  return atom !== undefined && atom !== null
}

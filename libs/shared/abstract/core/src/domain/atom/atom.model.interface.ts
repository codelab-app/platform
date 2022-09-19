import { IEntity, Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../service'
import { ITag } from '../tag'
import { IAnyType } from '../type'
import { IAtomDTO, IAtomPreviewDTO } from './atom.dto.interface'
import { IAtomType } from './atom-type.enum'

export interface IAtom extends IEntity, ICacheService<IAtomDTO, IAtom> {
  name: string
  icon?: string | null
  type: IAtomType
  tags: Array<Ref<ITag>>
  api: Ref<IAnyType>
  allowCustomTextInjection: boolean
}

export type IAtomRef = string

export const isAtomDTO = (atom: Nullish<IAtomPreviewDTO>): atom is IAtomDTO => {
  return atom !== undefined && atom !== null
}

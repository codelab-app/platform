import { IEntity, Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../service'
import { ITag } from '../tag'
import { IAnyType } from '../type'
import { IAtomDTO, IRenderAtomDTO } from './atom.dto.interface'
import { IAtomType } from '../../../../../../shared/abstract/core/src/atom-type.enum'

export interface IAtom extends IEntity, ICacheService<IAtomDTO, IAtom> {
  name: string
  icon?: string | null
  type: IAtomType
  tags: Array<Ref<ITag>>
  api: Ref<IAnyType>
  allowCustomTextInjection: boolean
  /**
   * We don't need Ref here, only need id to filter the select options. Making it Ref requires dependency resolution that makes it more difficult.
   *
   * We store preview data here so we can more easily display the tags in the atoms table
   */
  allowedChildren: Array<Pick<IAtomDTO, 'id' | 'name'>>
}

export type IAtomRef = string

export const isAtomDTO = (atom: Nullish<IRenderAtomDTO>): atom is IAtomDTO => {
  return atom !== undefined && atom !== null
}

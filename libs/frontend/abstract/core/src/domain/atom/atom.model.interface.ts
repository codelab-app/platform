import type { IAtomType } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { ITag } from '../tag'
import type { IAnyType } from '../type'
import type { IAtomDTO, IRenderAtomDTO } from './atom.dto.interface'

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

import type {
  AtomCreateInput,
  AtomUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAtomDTO, IAtomType, IOwner } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IModel } from '../model.interface'
import type { ITag } from '../tag'
import type { IInterfaceType } from '../type'
import type { IRenderAtomDTO } from './atom.dto.interface'

export interface IAtom
  extends ICacheService<IAtomDTO, IAtom>,
    Omit<IModel<AtomCreateInput, AtomUpdateInput, void>, 'toDeleteInput'>,
    IOwner {
  allowCustomTextInjection: boolean
  /**
   * We don't need Ref here, only need id to filter the select options. Making it Ref requires dependency resolution that makes it more difficult.
   *
   * We store preview data here so we can more easily display the tags in the atoms table
   */
  api: Ref<IInterfaceType>
  externalCssSource?: string | null
  externalJsSource?: string | null
  externalSourceType?: string | null
  icon?: string | null
  id: string
  name: string
  requiredParents: Array<Ref<IAtom>>
  suggestedChildren: Array<Ref<IAtom>>
  tags: Array<Ref<ITag>>
  type: IAtomType
}

export type IAtomRef = string

export const isAtomDTO = (
  atom: Nullish<IRenderAtomDTO>,
): atom is IRenderAtomDTO => {
  return atom !== undefined && atom !== null
}

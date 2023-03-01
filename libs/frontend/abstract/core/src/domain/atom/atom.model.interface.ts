import type { AtomCreateInput } from '@codelab/shared/abstract/codegen'
import type { IAtomType } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IComponent } from '../component'
import type { ITag } from '../tag'
import type { IInterfaceType } from '../type'
import type { IAuth0Owner, IOwnerSchema } from '../user'
import type { IAtomDTO, IRenderAtomDTO } from './atom.dto.interface'

export interface IAtom extends ICacheService<IAtomDTO, IAtom>, IOwnerSchema {
  id: string
  name: string
  icon?: string | null
  type: IAtomType
  tags: Array<Ref<ITag>>
  api: Ref<IInterfaceType>
  allowCustomTextInjection: boolean
  /**
   * We don't need Ref here, only need id to filter the select options. Making it Ref requires dependency resolution that makes it more difficult.
   *
   * We store preview data here so we can more easily display the tags in the atoms table
   */
  allowedChildren: Array<Ref<IAtom>>

  toCreateInput(): AtomCreateInput
}

export type IAtomRef = string

export const isAtomDTO = (
  atom: Nullish<IRenderAtomDTO>,
): atom is IRenderAtomDTO => {
  return atom !== undefined && atom !== null
}

export const isAtomModel = (
  atom: Ref<IAtom> | Ref<IComponent> | null,
): atom is Ref<IAtom> => {
  return atom?.$modelType === '@codelab/Atom'
}

import type {
  AtomCreateInput,
  AtomUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IAtomDTO,
  IAtomSerialized,
  IAtomType,
} from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IModel } from '../model.interface'
import type { ITagModel } from '../tag'
import type { IInterfaceType } from '../type'
import type { IRenderAtomDTO } from './atom.dto.interface'

export interface IAtomModel
  extends ICacheService<IAtomDTO, IAtomModel>,
    Omit<IModel<AtomCreateInput, AtomUpdateInput, void>, 'toDeleteInput'>,
    IAtomDTO {
  // __typename: IElementRenderTypeKind.Atom
  allowCustomTextInjection: boolean
  api: Ref<IInterfaceType>
  requiredParents: Array<Ref<IAtomModel>>
  suggestedChildren: Array<Ref<IAtomModel>>
  tags: Array<Ref<ITagModel>>
  toJson: IAtomSerialized
  type: IAtomType
}

export type IAtomRef = string

export const isAtomDTO = (
  atom: Nullish<IRenderAtomDTO>,
): atom is IRenderAtomDTO => {
  return atom !== undefined && atom !== null
}

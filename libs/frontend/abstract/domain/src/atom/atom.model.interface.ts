import type {
  IAtom,
  IAtomDto,
  IAtomType,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import type {
  AtomCreateInput,
  AtomUpdateInput,
} from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'
import type { ReactNode } from 'react'

import type { ICacheService } from '../shared'
import type { IModel } from '../shared/models/model.interface'
import type { ITagModel } from '../tag'
import type { IInterfaceTypeModel } from '../type'

export interface IAtomModel
  extends ICacheService<IAtomDto, IAtomModel>,
    Omit<
      IModel<AtomCreateInput, AtomUpdateInput, void, IAtom>,
      'toCreateInput' | 'toUpdateInput'
    >,
    IAtomDto {
  __typename: IElementRenderTypeKind.Atom
  api: Ref<IInterfaceTypeModel>
  library: {
    color: string
    icon?: ReactNode
    name: string
  }
  requiredParents: Array<Ref<IAtomModel>>
  suggestedChildren: Array<Ref<IAtomModel>>
  tags: Array<Ref<ITagModel>>
  type: IAtomType
}

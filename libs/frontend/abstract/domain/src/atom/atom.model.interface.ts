import type {
  AtomCreateInput,
  AtomUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAtom, IAtomDTO, IAtomType } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ReactNode } from 'react'
import type { ICacheService } from '../shared'
import type { IModel } from '../shared/models/model.interface'
import type { ITagModel } from '../tag'
import type { IInterfaceTypeModel } from '../type'

export interface IAtomModel
  extends ICacheService<IAtomDTO, IAtomModel>,
    Omit<
      IModel<AtomCreateInput, AtomUpdateInput, void, IAtom>,
      'toDeleteInput'
    >,
    IAtomDTO {
  allowCustomTextInjection: boolean
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

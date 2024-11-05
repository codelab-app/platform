import type {
  IAtom,
  IAtomDto,
  IAtomType,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type {
  AtomCreateInput,
  AtomUpdateInput,
} from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'
import type { ReactNode } from 'react'
import type { PickByValue } from 'utility-types'

import type { IModel } from '../shared/models/model.interface'
import type { ITagModel } from '../tag'
import type { IInterfaceTypeModel } from '../type'

export interface IAtomModel extends IModel<IAtom, IAtomModel> {
  __typename: IElementRenderTypeKind.Atom
  api: Ref<IInterfaceTypeModel>
  externalCssSource?: Nullish<string>
  externalJsSource?: Nullish<string>
  externalSourceType?: Nullish<string>
  icon?: Nullish<string>
  id: string
  library: {
    color: string
    icon?: ReactNode
    name: string
  }
  name: string
  requiredParents: Array<Ref<IAtomModel>>
  suggestedChildren: Array<Ref<IAtomModel>>
  tags: Array<Ref<ITagModel>>
  type: IAtomType
}

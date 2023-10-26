import type { IActionKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IElementModel } from '../element'
import type { IStoreModel } from '../store'

export interface IBaseAction {
  __typename: `${IActionKind}`
  element: Maybe<Ref<IElementModel>>
  id: string
  name: string
  store: Ref<IStoreModel>
  type: IActionKind
}

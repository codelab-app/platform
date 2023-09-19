import type { IActionKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IElementModel } from '../element'
import type { IStore } from '../store'

export interface IBaseAction {
  element: Maybe<Ref<IElementModel>>
  id: IActionRef
  name: string
  store: Ref<IStore>
  type: IActionKind
}

export type IActionRef = string

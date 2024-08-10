import type { SelectOption } from '@codelab/frontend/abstract/types'
import type { IActionDto, IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ActionFragment } from '@codelab/shared/infra/gql'
import type { ObjectMap } from 'mobx-keystone'
import type { IStoreModel } from '../store'
import type { IActionModel } from './action.model.interface'

export interface IActionFactory {
  fromActionFragment(fragment: ActionFragment): IActionDto
}

export interface IActionDomainService {
  actionFactory: IActionFactory
  actions: ObjectMap<IActionModel>
  actionsList: Array<IActionModel>

  action(id: string): Maybe<IActionModel>
  getSelectActionOptions(
    selectedNodeStore: IStoreModel,
    providerStore?: IStoreModel,
    actionEntity?: IRef,
  ): Array<SelectOption>
  hydrate<T extends IActionDto>(action: T): IActionModel
  load(actions: Array<ActionFragment>): Array<IActionModel>
}

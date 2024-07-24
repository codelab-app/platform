import type { ActionFragment } from '@codelab/frontend/infra/gql'
import type { IActionDto, IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DefaultOptionType } from 'antd/lib/select'
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
  ): Array<DefaultOptionType>
  hydrate<T extends IActionDto>(action: T): IActionModel
  load(actions: Array<ActionFragment>): Array<IActionModel>
}

import type { IActionDTO, IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DefaultOptionType } from 'antd/lib/select'
import type { ObjectMap } from 'mobx-keystone'
import type { IActionModel } from './action.model.interface'
import type { ActionFragment } from './fragments'

export interface IActionFactory {
  fromActionFragment(fragment: ActionFragment): IActionDTO
}

export interface IActionDomainService {
  actionFactory: IActionFactory
  actions: ObjectMap<IActionModel>
  actionsList: Array<IActionModel>

  action(id: string): Maybe<IActionModel>
  getSelectActionOptions(actionEntity?: IRef): Array<DefaultOptionType>
  hydrate<T extends IActionDTO>(action: T): IActionModel
  load(actions: Array<ActionFragment>): Array<IActionModel>
}

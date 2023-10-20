import type {
  IActionModel,
  IActionWhere,
  ICreateActionData,
  IStoreModel,
  IUpdateActionData,
} from '@codelab/frontend/abstract/domain'
import type {
  ActionFragment,
  ApiActionOptions,
} from '@codelab/shared/abstract/codegen'
import type { IActionDTO } from '@codelab/shared/abstract/core'
import type { IEntity, Maybe } from '@codelab/shared/abstract/types'
import type { DefaultOptionType } from 'antd/lib/select'
import type { ObjectMap } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IEntityFormService,
  IQueryService,
} from '../services'

export interface IActionFactory {
  fromActionFragment(fragment: ActionFragment): IActionDTO
}

export interface IActionService
  extends ICRUDService<IActionModel, ICreateActionData, IUpdateActionData>,
    IQueryService<IActionModel, IActionWhere, ApiActionOptions>,
    ICRUDModalService<IActionModel, { action?: IActionModel }>,
    Omit<
      ICRUDFormService<IActionModel, { action?: IActionModel }>,
      'createForm'
    > {
  actionFactory: IActionFactory
  actions: ObjectMap<IActionModel>
  actionsList: Array<IActionModel>
  createForm: IEntityFormService<IStoreModel, { store?: IStoreModel }>

  action(id: string): Maybe<IActionModel>
  add<T extends IActionDTO>(action: T): IActionModel
  cloneAction(action: IActionModel, storeId: string): Promise<IActionModel>
  getSelectActionOptions(actionEntity?: IEntity): Array<DefaultOptionType>
  load(actions: Array<ActionFragment>): Array<IActionModel>
}

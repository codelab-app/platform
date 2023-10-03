import type {
  ActionFragment,
  ApiActionOptions,
} from '@codelab/shared/abstract/codegen'
import type { IActionDTO } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IEntityFormService,
  IQueryService,
} from '../../service'
import type { IStoreModel } from '../store'
import type {
  ICreateActionData,
  IUpdateActionData,
} from './action.dto.interface'
import type { IActionModel } from './action.model.interface'
import type { IActionWhere } from './action.where.interface'

export interface IActionFactory {
  fromActionFragment(fragment: ActionFragment): IActionDTO
}

export interface IActionService
  extends ICRUDService<IActionModel, ICreateActionData, IUpdateActionData>,
    IQueryService<IActionModel, IActionWhere, ApiActionOptions>,
    ICRUDModalService<Ref<IActionModel>, { action: Maybe<IActionModel> }>,
    Omit<
      ICRUDFormService<Ref<IActionModel>, { action: Maybe<IActionModel> }>,
      'createForm'
    > {
  actionFactory: IActionFactory
  actionsList: Array<IActionModel>
  createForm: IEntityFormService<
    Ref<IStoreModel>,
    { store: Maybe<IStoreModel> }
  >

  action(id: string): Maybe<IActionModel>
  add<T extends IActionDTO>(action: T): IActionModel
  cloneAction(action: IActionModel, storeId: string): Promise<IActionModel>
  load(actions: Array<ActionFragment>): Array<IActionModel>
}

import type {
  ActionFragment,
  ApiActionOptions,
} from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import type {
  IActionDTO,
  IBaseActionDTO,
  ICreateActionData,
  IUpdateActionData,
} from './action.dto.interface'
import type { IAnyAction } from './action.interface'
import type { IAnyActionWhere } from './action.where.interface'
import type { IApiAction } from './actions'

export interface IActionFactory {
  fromActionFragment(fragment: ActionFragment): IActionDTO
}

export interface IActionService
  extends ICRUDService<IAnyAction, ICreateActionData, IUpdateActionData>,
    Omit<
      IQueryService<IAnyAction, IAnyActionWhere, ApiActionOptions>,
      'getAll'
    >,
    ICRUDModalService<Ref<IAnyAction>, { action: Maybe<IAnyAction> }> {
  actionsList: Array<IAnyAction>
  action(id: string): Maybe<IAnyAction>
  add(action: IBaseActionDTO): IAnyAction
  setSelectedActions(actions: Array<Ref<IAnyAction>>): void
  // Replace due to union interface neo4j issue
  getAll(storeId?: string): Promise<Array<IAnyAction>>
  actionFactory: IActionFactory
}

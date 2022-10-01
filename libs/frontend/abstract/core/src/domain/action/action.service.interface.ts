import { Maybe } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import { IAnyActionWhere } from './action.where.interface'
import {
  IActionDTO,
  IAnyAction,
  ICreateActionDTO,
  IUpdateActionDTO,
} from './index'

export interface IActionService
  extends ICRUDService<IAnyAction, ICreateActionDTO, IUpdateActionDTO>,
    Omit<IQueryService<IAnyAction, IAnyActionWhere>, 'getAll'>,
    ICRUDModalService<Ref<IAnyAction>, { action: Maybe<IAnyAction> }>,
    ICacheService<IActionDTO, IAnyAction> {
  actionsList: Array<IAnyAction>
  action(id: string): Maybe<IAnyAction>
  setSelectedActions(actions: Array<Ref<IAnyAction>>): void
  // Replace due to union interface neo4j issue
  getAll(storeId?: string): Promise<Array<IAnyAction>>
}

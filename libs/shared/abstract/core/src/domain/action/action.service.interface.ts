import { Maybe } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import {
  IActionDTO,
  IAnyAction,
  ICreateActionDTO,
  IUpdateActionDTO,
} from '../action'
import { IAnyActionWhere } from './action.where.interface'

export interface IActionService
  extends ICRUDService<IAnyAction, ICreateActionDTO, IUpdateActionDTO>,
    IQueryService<IAnyAction, IAnyActionWhere>,
    ICRUDModalService<Ref<IAnyAction>, { action: Maybe<IAnyAction> }>,
    ICacheService<IActionDTO, IAnyAction> {
  actionsList: Array<IAnyAction>
  action(id: string): Maybe<IAnyAction>
  setSelectedActions(actions: Array<Ref<IAnyAction>>): void
  hydrateOrUpdateCache(actions: Array<IActionDTO>): Array<IAnyAction>
}

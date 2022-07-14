import { Maybe } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import {
  CacheService,
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
    CacheService<IAnyAction, IActionDTO> {
  actionsList: Array<IAnyAction>
  setSelectedActions(actions: Array<Ref<IAnyAction>>): void
  hydrateOrUpdateCache(actions: Array<IActionDTO>): Array<IAnyAction>
}

import { ActionWhere } from '@codelab/shared/abstract/codegen'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import {
  CacheService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import {
  IActionDTO,
  ICreateActionDTO,
  IUpdateActionDTO,
} from './action.dto.interface'
import { IAction } from './action.model.interface'

export interface IActionService
  extends ICRUDService<IAction, ICreateActionDTO, IUpdateActionDTO>,
    IQueryService<IAction, ActionWhere>,
    ICRUDModalService<Ref<IAction>, { action: Maybe<IAction> }>,
    CacheService<IAction, IActionDTO> {
  actionsList(storeId: Nullish<string>): Array<IAction>
  setSelectedActions(actions: Array<Ref<IAction>>): void
  hydrateOrUpdateCache(actions: Array<IActionDTO>): Array<IAction>
}

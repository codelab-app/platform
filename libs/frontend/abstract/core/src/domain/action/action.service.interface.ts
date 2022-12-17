import type { ApiActionOptions } from '@codelab/shared/abstract/codegen'
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
  ICreateActionDTO,
  IUpdateActionDTO,
} from './action.dto.interface'
import type { IAnyAction } from './action.interface'
import type { IAnyActionWhere } from './action.where.interface'

export interface IActionService
  extends ICRUDService<IAnyAction, ICreateActionDTO, IUpdateActionDTO>,
    Omit<
      IQueryService<IAnyAction, IAnyActionWhere, ApiActionOptions>,
      'getAll'
    >,
    ICRUDModalService<Ref<IAnyAction>, { action: Maybe<IAnyAction> }>,
    ICacheService<IActionDTO, IAnyAction> {
  actionsList: Array<IAnyAction>
  action(id: string): Maybe<IAnyAction>
  setSelectedActions(actions: Array<Ref<IAnyAction>>): void
  // Replace due to union interface neo4j issue
  getAll(storeId?: string): Promise<Array<IAnyAction>>
}

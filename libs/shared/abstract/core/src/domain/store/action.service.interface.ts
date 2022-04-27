import { ActionWhere } from '@codelab/shared/abstract/codegen'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ICRUDModalService, ICRUDService, IQueryService } from '../../service'
import { ICreateActionDTO, IUpdateActionDTO } from './action.dto.interface'
import { IAction } from './action.model.interface'

export interface IActionService
  extends ICRUDService<IAction, ICreateActionDTO, IUpdateActionDTO>,
    IQueryService<IAction, ActionWhere>,
    ICRUDModalService<Ref<IAction>, { action: Maybe<IAction> }> {
  actionsList(storeId: Nullish<string>): Array<IAction>
  setSelectedActions(actions: Array<Ref<IAction>>): void
}

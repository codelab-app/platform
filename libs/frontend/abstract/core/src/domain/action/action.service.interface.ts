import type { IRepository } from '../../service'
import type { IAction } from './action.interface'
import type { IActionWhere } from './action.where.interface'
import type { ActionFragment } from './fragments'

export interface IActionFactory {
  fromActionFragment(fragment: ActionFragment): IActionDTO
}

export interface IActionService
  extends ICRUDService<IAction, ICreateActionData, IUpdateActionData>,
    Omit<IQueryService<IAction, IAnyActionWhere, ApiActionOptions>, 'getAll'>,
    ICRUDModalService<Ref<IAction>, { action: Maybe<IAction> }> {
  actionFactory: IActionFactory
  actionsList: Array<IAction>

  action(id: string): Maybe<IAction>
  add(action: IBaseActionDTO): IAction
  // Replace due to union interface neo4j issue
  getAll(storeId?: string): Promise<Array<IAction>>
  setSelectedActions(actions: Array<Ref<IAction>>): void
}

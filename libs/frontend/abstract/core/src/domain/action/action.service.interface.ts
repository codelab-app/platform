import type {
  ActionFragment,
  ApiActionOptions,
} from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type {
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
import type { IAction } from './action.interface'
import type { IActionWhere } from './action.where.interface'

export interface IActionFactory {
  fromActionFragment(fragment: ActionFragment): IActionDTO
}

export interface IActionService
  extends ICRUDService<IAction, ICreateActionData, IUpdateActionData>,
    IQueryService<IAction, IActionWhere, ApiActionOptions>,
    ICRUDModalService<Ref<IAction>, { action: Maybe<IAction> }> {
  actionFactory: IActionFactory
  actionsList: Array<IAction>

  action(id: string): Maybe<IAction>
  add(action: IBaseActionDTO): IAction
  load(actions: Array<ActionFragment>): Array<IAction>
}

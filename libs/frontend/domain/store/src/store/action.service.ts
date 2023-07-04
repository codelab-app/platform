import type {
  IAction,
  IActionDTO,
  IActionService,
  IActionWhere,
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getTypeService } from '@codelab/frontend/domain/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { ActionFragment } from '@codelab/shared/abstract/codegen'
import { IActionKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { ActionRepository } from '../services/action.repo'
import { ActionFactory } from './action.factory'
import {
  ActionFormService,
  CreateActionFormService,
} from './action-form.service'
import { ActionModalService } from './action-modal.service'
import { ApiAction, CodeAction } from './models'

@model('@codelab/ActionService')
export class ActionService
  extends Model({
    actionFactory: prop(() => new ActionFactory({})),
    actionRepository: prop(() => new ActionRepository({})),
    actions: prop(() => objectMap<IAction>()),
    createForm: prop(() => new CreateActionFormService({})),
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new ActionModalService({})),
    updateForm: prop(() => new ActionFormService({})),
    updateModal: prop(() => new ActionModalService({})),
  })
  implements IActionService
{
  @computed
  get actionsList() {
    return [...this.actions.values()]
  }

  @computed
  get propService() {
    return getPropService(this)
  }

  @computed
  get typeService() {
    return getTypeService(this)
  }

  action(id: string) {
    return this.actions.get(id)
  }

  @modelAction
  add<T extends IActionDTO>(actionDTO: T) {
    const action =
      actionDTO.__typename === IActionKind.CodeAction
        ? CodeAction.create(actionDTO)
        : ApiAction.create(actionDTO)

    this.actions.set(action.id, action)

    return action
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ActionService, where: IActionWhere) {
    const { items: actionFragments } = yield* _await(
      this.actionRepository.find(where),
    )

    return this.load(actionFragments)
  })

  @modelAction
  load(actions: Array<ActionFragment>) {
    return actions.map((action) =>
      this.add(this.actionFactory.fromActionFragment(action)),
    )
  }

  @modelFlow
  @transaction
  getOne = _async(function* (this: ActionService, id: string) {
    return this.actions.has(id)
      ? this.actions.get(id)
      : (yield* _await(this.getAll({ id })))[0]
  })

  @modelFlow
  @transaction
  create = _async(function* (this: ActionService, data: ICreateActionData) {
    const action = this.add(ActionFactory.mapDataToDTO(data))

    if (data.type === IActionKind.ApiAction) {
      this.propService.add({
        data: JSON.stringify(data.config.data),
        id: data.config.id,
      })
    }

    yield* _await(this.actionRepository.add(action))

    return action
  })

  @modelFlow
  @transaction
  update = _async(function* (this: ActionService, data: IUpdateActionData) {
    const action = this.actions.get(data.id)!
    const actionDTO = ActionFactory.mapDataToDTO(data)

    if (action.type === IActionKind.ApiAction) {
      action.config.current.writeCache({
        data: JSON.stringify(data.config.data),
      })
    }

    ActionFactory.writeCache(actionDTO, action)

    yield* _await(this.actionRepository.update(action))

    return action
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ActionService, action: IAction) {
    const { id } = action

    this.actions.delete(id)

    yield* _await(this.actionRepository.delete(action))

    return action
  })
}

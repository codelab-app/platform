import {
  actionRef,
  type IActionModel,
  type IActionService,
  type IActionWhere,
  type ICreateActionData,
  type IUpdateActionData,
} from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import { ModalService } from '@codelab/frontend/domain/shared'
import { getTypeService } from '@codelab/frontend/domain/type'
import type { ActionFragment } from '@codelab/shared/abstract/codegen'
import type { IActionDTO } from '@codelab/shared/abstract/core'
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
import { v4 } from 'uuid'
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
    actions: prop(() => objectMap<IActionModel>()),
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

  @modelFlow
  @transaction
  cloneAction = _async(function* (
    this: ActionService,
    action: IActionModel,
    storeId: string,
  ) {
    return yield* _await(this.recursiveClone(action, storeId))
  })

  @modelFlow
  @transaction
  create = _async(function* (this: ActionService, data: ICreateActionData) {
    const action = this.add(ActionFactory.mapDataToDTO(data))
    const store = action.store.current

    store.actions.push(actionRef(action))

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
  delete = _async(function* (
    this: ActionService,
    actions: Array<IActionModel>,
  ) {
    const deleteAction = async (action: IActionModel) => {
      const { id } = action

      this.actions.delete(id)

      await Promise.resolve()
    }

    yield* _await(this.actionRepository.delete(actions))

    return
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: ActionService, where: IActionWhere) {
    const { items: actionFragments } = yield* _await(
      this.actionRepository.find(where),
    )

    return this.load(actionFragments)
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: ActionService, id: string) {
    return this.actions.has(id)
      ? this.actions.get(id)
      : (yield* _await(this.getAll({ id })))[0]
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

  @modelAction
  add<T extends IActionDTO>(actionDTO: T) {
    let action: IActionModel

    switch (actionDTO.__typename) {
      case IActionKind.CodeAction:
        action = CodeAction.create(actionDTO)
        break
      case IActionKind.ApiAction:
        action = ApiAction.create(actionDTO)
        break
      default:
        throw new Error(`Unsupported action kind: ${actionDTO.__typename}`)
    }

    this.actions.set(action.id, action)

    return action
  }

  @modelAction
  load(actions: Array<ActionFragment>) {
    return actions.map((action) =>
      this.add(this.actionFactory.fromActionFragment(action)),
    )
  }

  action(id: string) {
    return this.actions.get(id)
  }

  private async recursiveClone(action: IActionModel, storeId: string) {
    const actionDto = ActionFactory.mapActionToDTO(action)

    let newActionDto: IActionDTO = {
      ...actionDto,
      id: v4(),
      store: { id: storeId },
    }

    if (action.type === IActionKind.ApiAction) {
      if (action.successAction?.current) {
        const successActionCloned = await this.recursiveClone(
          action.successAction.current,
          storeId,
        )

        newActionDto = {
          ...newActionDto,
          successAction: { id: successActionCloned.id },
        } as IActionDTO
      }

      if (action.errorAction?.current) {
        const errorActionCloned = await this.recursiveClone(
          action.errorAction.current,
          storeId,
        )

        newActionDto = {
          ...newActionDto,
          errorAction: { id: errorActionCloned.id },
        } as IActionDTO
      }
    }

    const newAction = this.add(newActionDto)
    await this.actionRepository.add(newAction)

    return newAction
  }

  @computed
  private get propService() {
    return getPropService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }
}

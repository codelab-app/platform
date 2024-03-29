import { type IActionService } from '@codelab/frontend/abstract/application'
import {
  type IActionModel,
  type IActionWhere,
} from '@codelab/frontend/abstract/domain'
import { getPropService } from '@codelab/frontend/application/prop'
import { ModalService } from '@codelab/frontend/application/shared/store'
import { getTypeService } from '@codelab/frontend/application/type'
import {
  ActionDomainService,
  ActionFactory,
} from '@codelab/frontend/domain/action'
import type {
  IActionDto,
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { ActionRepository } from './action.repo'
import {
  ActionFormService,
  CreateActionFormService,
} from './action-form.service'
import { ActionModalService } from './action-modal.service'

@model('@codelab/ActionService')
export class ActionService
  extends Model({
    actionDomainService: prop(() => new ActionDomainService({})),
    actionRepository: prop(() => new ActionRepository({})),
    createForm: prop(() => new CreateActionFormService({})),
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new ActionModalService({})),
    updateForm: prop(() => new ActionFormService({})),
    updateModal: prop(() => new ActionModalService({})),
  })
  implements IActionService
{
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
    const action = this.actionDomainService.hydrate(
      ActionFactory.mapDataToDto(data),
    )

    yield* _await(this.actionRepository.add(action))

    return action
  })

  @modelFlow
  @transaction
  delete = _async(function* (
    this: ActionService,
    actions: Array<IActionModel>,
  ) {
    for (const action of actions) {
      const { id } = action

      this.actionDomainService.actions.delete(id)
    }

    yield* _await(this.actionRepository.delete(actions))
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: ActionService, where: IActionWhere) {
    const { items: actionFragments } = yield* _await(
      this.actionRepository.find(where),
    )

    return this.actionDomainService.load(actionFragments)
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: ActionService, id: string) {
    return this.actionDomainService.actions.has(id)
      ? this.actionDomainService.actions.get(id)
      : (yield* _await(this.getAll({ id })))[0]
  })

  @modelFlow
  @transaction
  update = _async(function* (this: ActionService, data: IUpdateActionData) {
    const action = this.actionDomainService.actions.get(data.id)!
    const actionDto = ActionFactory.mapDataToDto(data)

    // ActionFactory below should be enough
    //
    // if (action.type === IActionKind.ApiAction) {
    //   action.config.writeCache({
    //     data: JSON.stringify(data.config.data),
    //   })
    // }

    ActionFactory.writeCache(actionDto, action)

    yield* _await(this.actionRepository.update(action))

    return action
  })

  private async recursiveClone(action: IActionModel, storeId: string) {
    const actionDto = ActionFactory.mapActionToDto(action)

    let newActionDto: IActionDto = {
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
        } as IActionDto
      }

      if (action.errorAction?.current) {
        const errorActionCloned = await this.recursiveClone(
          action.errorAction.current,
          storeId,
        )

        newActionDto = {
          ...newActionDto,
          errorAction: { id: errorActionCloned.id },
        } as IActionDto
      }
    }

    const newAction = this.actionDomainService.hydrate(newActionDto)

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

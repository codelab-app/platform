import {
  getBuilderService,
  type IActionService,
} from '@codelab/frontend/abstract/application'
import {
  actionRef,
  type IActionModel,
  type IActionWhere,
  type ICreateActionData,
  isElementRef,
  type IUpdateActionData,
} from '@codelab/frontend/abstract/domain'
import { getPropService } from '@codelab/frontend/application/prop'
import { getTypeService } from '@codelab/frontend/application/type'
import { ModalService } from '@codelab/frontend/domain/shared'
import {
  ActionFactory,
  ApiAction,
  CodeAction,
} from '@codelab/frontend/domain/store'
import type { ActionFragment } from '@codelab/shared/abstract/codegen'
import type { IActionDTO } from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import uniq from 'lodash/uniq'
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
import { ActionRepository } from './action.repo'
import {
  ActionFormService,
  CreateActionFormService,
} from './action-form.service'
import { ActionModalService } from './action-modal.service'

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

  @computed
  get builderService() {
    return getBuilderService(this)
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
      action.config.writeCache({
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

  getSelectActionOptions(actionEntity?: IEntity) {
    const { selectedNode } = this.builderService
    const selectedNodeStore = selectedNode?.current.store.current

    const providerStore =
      selectedNode && isElementRef(selectedNode)
        ? selectedNode.current.providerStore
        : undefined

    const updatedAction = actionEntity
      ? this.action(actionEntity.id)
      : undefined

    const parentActions = this.getParentActions(updatedAction)

    const filtered = this.actionsList.filter((action) => {
      const belongsToStore =
        action.store.id === selectedNodeStore?.id ||
        action.store.id === providerStore?.id

      // when selecting success,error actions for an apiAction
      // it should not appear in selection
      const actionBeingUpdated = action.id === updatedAction?.id
      // calling parent actions will cause infinite loop
      const parentAction = parentActions.includes(action.id)

      return belongsToStore && !actionBeingUpdated && !parentAction
    })

    return filtered.map((action) => ({
      label: action.name,
      value: action.id,
    }))
  }

  private getParentActions(action?: IActionModel): Array<string> {
    if (!action) {
      return []
    }

    const parents = this.actionsList.filter(
      (parent) =>
        parent.type === IActionKind.ApiAction &&
        (parent.successAction?.id === action.id ||
          parent.errorAction?.id === action.id),
    )

    return (
      parents
        .map((parent) => parent.id)
        // get parents of parents
        .concat(
          uniq(parents.flatMap((parent) => this.getParentActions(parent))),
        )
    )
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

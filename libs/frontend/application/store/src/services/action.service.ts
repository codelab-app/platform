import { type IActionService } from '@codelab/frontend/abstract/application'
import {
  type IActionModel,
  type IActionWhere,
} from '@codelab/frontend/abstract/domain'
import { getPropService } from '@codelab/frontend-application-prop/services'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import { ModalService } from '@codelab/frontend-application-shared-store/ui'
import { getTypeService } from '@codelab/frontend-application-type/services'
import { ActionDomainService } from '@codelab/frontend-domain-action/services'
import { ActionFactory } from '@codelab/frontend-domain-action/store'
import { actionRepository } from '@codelab/frontend-domain-store/repositories'
import type {
  IActionDto,
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import { assertIsDefined } from '@codelab/shared/utils'
import { v4 } from 'uuid'

export const useActionService = (): IActionService => {
  const { actionDomainService } = useDomainStore()

  const cloneAction = async (action: IActionModel, storeId: string) => {
    return await recursiveClone(action, storeId)
  }

  const create = async (data: ICreateActionData) => {
    const action = actionDomainService.hydrate(ActionFactory.mapDataToDto(data))

    await actionRepository.add(action)

    return action
  }

  const remove = async (actions: Array<IActionModel>) => {
    for (const action of actions) {
      const { id } = action

      actionDomainService.actions.delete(id)
    }

    return await actionRepository.delete(actions)
  }

  const getAll = async (where: IActionWhere) => {
    const { items: actionFragments } = await actionRepository.find(where)

    return actionDomainService.load(actionFragments)
  }

  const getOne = async (id: string) => {
    return actionDomainService.actions.has(id)
      ? actionDomainService.actions.get(id)
      : (await getAll({ id }))[0]
  }

  const update = async (data: IUpdateActionData) => {
    const action = actionDomainService.actions.get(data.id)

    assertIsDefined(action)

    const actionDto = ActionFactory.mapDataToDto(data)

    ActionFactory.writeCache(actionDto, action)

    await actionRepository.update(action)

    return action
  }

  const recursiveClone = async (action: IActionModel, storeId: string) => {
    const actionDto = ActionFactory.mapActionToDto(action)

    let newActionDto: IActionDto = {
      ...actionDto,
      id: v4(),
      store: { id: storeId },
    }

    if (action.type === IActionKind.ApiAction) {
      if (action.successAction?.current) {
        const successActionCloned = await recursiveClone(
          action.successAction.current,
          storeId,
        )

        newActionDto = {
          ...newActionDto,
          successAction: { id: successActionCloned.id },
        } as IActionDto
      }

      if (action.errorAction?.current) {
        const errorActionCloned = await recursiveClone(
          action.errorAction.current,
          storeId,
        )

        newActionDto = {
          ...newActionDto,
          errorAction: { id: errorActionCloned.id },
        } as IActionDto
      }
    }

    const newAction = actionDomainService.hydrate(newActionDto)

    await actionRepository.add(newAction)

    return newAction
  }

  return {
    cloneAction,
    create,
    getAll,
    getOne,
    remove,
    update,
  }
}

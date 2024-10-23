import type {
  IActionDto,
  ICreateActionData,
  IRef,
  IUpdateActionData,
} from '@codelab/shared/abstract/core'

import { type IActionService } from '@codelab/frontend/abstract/application'
import {
  type IActionModel,
  type IActionWhere,
} from '@codelab/frontend/abstract/domain'
import { actionRepository } from '@codelab/frontend-domain-store/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { IActionKind } from '@codelab/shared/abstract/core'
import { actionFactory } from '@codelab/shared/domain-old'
import { Validator } from '@codelab/shared/infra/schema'
import { v4 } from 'uuid'

export const useActionService = (): IActionService => {
  const { actionDomainService } = useDomainStore()

  const cloneAction = async (action: IActionModel, storeId: string) => {
    return await recursiveClone(action, storeId)
  }

  const create = async (data: ICreateActionData) => {
    // const action = actionDomainService.hydrate(ActionFactory.mapDataToDto(data))
    const action = actionFactory.mapDataToDto(data)

    return await actionRepository.add(action)
  }

  const removeMany = async (actions: Array<IActionModel>) => {
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

    Validator.assertsDefined(action)

    const actionDto = actionFactory.mapDataToDto(data)

    // ActionFactory.writeCache(actionDto, action)

    await actionRepository.update({ id: action.id }, actionDto)

    return action
  }

  const recursiveClone = async (action: IActionModel, storeId: string) => {
    const actionDto = action.toJson

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

    return await actionRepository.add(newActionDto)
  }

  const getOneFromCache = (ref: IRef) => {
    return actionDomainService.actions.get(ref.id)
  }

  const getAllFromCache = () => {
    return Array.from(actionDomainService.actions.values())
  }

  return {
    cloneAction,
    create,
    getAll,
    getAllFromCache,
    getOne,
    getOneFromCache,
    removeMany,
    update,
  }
}

import type {
  ComponentContextParams,
  PageContextParams,
} from '@codelab/frontend/abstract/types'
import type {
  IActionDto,
  ICreateActionData,
  IRef,
  IUpdateActionData,
} from '@codelab/shared/abstract/core'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { type IActionService } from '@codelab/frontend/abstract/application'
import {
  type IActionModel,
  type IActionWhere,
} from '@codelab/frontend/abstract/domain'
import { PageType, PrimarySidebar } from '@codelab/frontend/abstract/types'
import { useHydrateStore } from '@codelab/frontend/infra/context'
import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'
import { actionRepository } from '@codelab/frontend-domain-store/repositories'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { IActionKind } from '@codelab/shared/abstract/core'
import { actionFactory } from '@codelab/shared/domain-old'
import { Validator } from '@codelab/shared/infra/schema'
import { v4 } from 'uuid'

export const useActionService = (): IActionService => {
  const { actionDomainService } = useDomainStore()
  const { builderService } = useApplicationStore()
  const hydrate = useHydrateStore()

  const cloneAction = async (action: IActionModel, storeId: string) => {
    return await recursiveClone(action, storeId)
  }

  const create = async (data: ICreateActionData) => {
    const action = actionFactory.mapDataToDto(data)

    hydrate({ actionsDto: [action] })

    return await actionRepository.add(action)
  }

  const removeMany = async (actions: Array<IActionModel>) => {
    for (const action of actions) {
      const { id } = action
      const { runtimeStore } = builderService.selectedNode?.current ?? {}

      const foundRuntimeAction = runtimeStore?.runtimeActionsList.find(
        (runtimeAction) => runtimeAction.action.id === id,
      )

      actionDomainService.actions.delete(id)

      if (runtimeStore && foundRuntimeAction) {
        runtimeStore.runtimeActions.delete(foundRuntimeAction.id)
      }
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

    hydrate({ actionsDto: [actionDto] })

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

  const createPopover = {
    close: (router: AppRouterInstance) => {
      router.back()
    },
    open: (
      router: AppRouterInstance,
      {
        appId,
        componentId,
        pageId,
      }: PageContextParams & ComponentContextParams,
    ) => {
      const url =
        appId && pageId
          ? PageType.PageBuilder({ appId, pageId }, PrimarySidebar.ElementTree)
          : PageType.ComponentBuilder({ componentId })

      router.push(`${url}/create-action`)
    },
  }

  const updatePopover = {
    close: (router: AppRouterInstance) => {
      router.back()
    },
    open: (
      router: AppRouterInstance,
      {
        appId,
        componentId,
        pageId,
      }: PageContextParams & ComponentContextParams,
    ) => {
      const url =
        appId && pageId
          ? PageType.PageBuilder({ appId, pageId }, PrimarySidebar.ElementTree)
          : PageType.ComponentBuilder({ componentId })

      router.push(`${url}/update-action`)
    },
  }

  return {
    cloneAction,
    create,
    createPopover,
    getAll,
    getAllFromCache,
    getOne,
    getOneFromCache,
    removeMany,
    update,
    updatePopover,
  }
}
